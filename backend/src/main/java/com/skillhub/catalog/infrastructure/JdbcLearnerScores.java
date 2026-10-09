package com.skillhub.catalog.infrastructure;

import com.skillhub.catalog.domain.LearnerScores;
import com.skillhub.catalog.domain.LessonScore;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
class JdbcLearnerScores implements LearnerScores {

    private final JdbcClient jdbc;

    JdbcLearnerScores(JdbcClient jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Map<Integer, LessonScore> of(UUID userId) {
        Map<Integer, LessonScore> scores = new HashMap<>();
        jdbc.sql("""
                        SELECT lesson_id, max(score) AS best_score, count(*) AS attempts
                        FROM quiz_attempts WHERE user_id = :userId GROUP BY lesson_id""")
                .param("userId", userId)
                .query(rs -> {
                    scores.put(rs.getInt("lesson_id"), new LessonScore(rs.getInt("best_score"), rs.getInt("attempts")));
                });
        return scores;
    }
}
