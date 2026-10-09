package com.skillhub.progress.infrastructure;

import com.skillhub.catalog.domain.LessonStatusPolicy;
import com.skillhub.progress.domain.BadgeDefinition;
import com.skillhub.progress.domain.LearnerStats;
import com.skillhub.progress.domain.ProgressRepository;
import com.skillhub.shared.time.AppTime;
import java.time.Instant;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.UUID;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
class JdbcProgressRepository implements ProgressRepository {

    private static final String LOCAL_DAY = "(completed_at AT TIME ZONE 'Europe/Istanbul')::date";

    private final JdbcClient jdbc;

    JdbcProgressRepository(JdbcClient jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public void recordXp(UUID userId, int amount, int lessonId, UUID attemptId, Instant at) {
        jdbc.sql("""
                        INSERT INTO xp_events (user_id, amount, reason, lesson_id, attempt_id, created_at)
                        VALUES (:userId, :amount, 'QUIZ_SCORE', :lessonId, :attemptId, :at)""")
                .param("userId", userId).param("amount", amount).param("lessonId", lessonId)
                .param("attemptId", attemptId).param("at", AppTime.toDb(at))
                .update();
    }

    @Override
    public LearnerStats stats(UUID userId) {
        int totalXp = jdbc.sql("SELECT coalesce(sum(amount), 0) FROM xp_events WHERE user_id = :userId")
                .param("userId", userId).query(Integer.class).single();
        Map<Integer, Integer> best = new HashMap<>();
        jdbc.sql("SELECT lesson_id, max(score) AS best FROM quiz_attempts WHERE user_id = :userId GROUP BY lesson_id")
                .param("userId", userId)
                .query(rs -> {
                    best.put(rs.getInt("lesson_id"), rs.getInt("best"));
                });
        Set<Integer> completed = new HashSet<>();
        best.forEach((lessonId, score) -> {
            if (LessonStatusPolicy.isPassing(score)) {
                completed.add(lessonId);
            }
        });
        Set<LocalDate> activeDays = new HashSet<>(jdbc.sql(
                        "SELECT DISTINCT " + LOCAL_DAY + " FROM quiz_attempts WHERE user_id = :userId")
                .param("userId", userId).query(LocalDate.class).list());
        int attempts = jdbc.sql("SELECT count(*) FROM quiz_attempts WHERE user_id = :userId")
                .param("userId", userId).query(Integer.class).single();
        return new LearnerStats(totalXp, Map.copyOf(best), Set.copyOf(completed), Set.copyOf(activeDays), attempts);
    }

    @Override
    public Map<LocalDate, Integer> xpPerDay(UUID userId, LocalDate since) {
        Map<LocalDate, Integer> perDay = new TreeMap<>();
        jdbc.sql("""
                        SELECT (created_at AT TIME ZONE 'Europe/Istanbul')::date AS day, sum(amount) AS xp
                        FROM xp_events WHERE user_id = :userId
                          AND (created_at AT TIME ZONE 'Europe/Istanbul')::date >= :since
                        GROUP BY day""")
                .param("userId", userId).param("since", since)
                .query(rs -> {
                    perDay.put(rs.getObject("day", LocalDate.class), rs.getInt("xp"));
                });
        return perDay;
    }

    @Override
    public List<BadgeDefinition> badgeDefinitions() {
        return jdbc.sql("""
                        SELECT code, name, description, hint, icon, tier, secret, sort_order
                        FROM badges ORDER BY sort_order""")
                .query(BadgeDefinition.class).list();
    }

    @Override
    public Map<String, Instant> earnedBadges(UUID userId) {
        Map<String, Instant> earned = new LinkedHashMap<>();
        jdbc.sql("SELECT badge_code, awarded_at FROM user_badges WHERE user_id = :userId ORDER BY awarded_at")
                .param("userId", userId)
                .query(rs -> {
                    earned.put(rs.getString("badge_code"), rs.getObject("awarded_at", OffsetDateTime.class).toInstant());
                });
        return earned;
    }

    @Override
    public boolean awardBadge(UUID userId, String code, Instant at) {
        return jdbc.sql("""
                        INSERT INTO user_badges (user_id, badge_code, awarded_at) VALUES (:userId, :code, :at)
                        ON CONFLICT (user_id, badge_code) DO NOTHING""")
                .param("userId", userId).param("code", code).param("at", AppTime.toDb(at))
                .update() == 1;
    }
}
