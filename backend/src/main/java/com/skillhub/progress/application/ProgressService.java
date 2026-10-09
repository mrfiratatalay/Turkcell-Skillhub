package com.skillhub.progress.application;

import com.skillhub.catalog.application.CatalogService;
import com.skillhub.progress.domain.LearnerStats;
import com.skillhub.progress.domain.NightClock;
import com.skillhub.progress.domain.ProgressRepository;
import com.skillhub.progress.domain.Streak;
import com.skillhub.shared.time.AppTime;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProgressService {

    private final ProgressRepository repository;
    private final CatalogService catalog;
    private final Clock clock;

    public ProgressService(ProgressRepository repository, CatalogService catalog, Clock clock) {
        this.repository = repository;
        this.catalog = catalog;
        this.clock = clock;
    }

    public record ProgressSummary(int totalXp, NightClock nightClock, int completedLessons, int totalLessons,
                                  int badgeCount, int totalBadges, int streakDays, int longestStreak,
                                  int attemptCount, boolean activeToday) {
    }

    public record XpDay(LocalDate date, int xp, int cumulativeXp) {
    }

    @Transactional(readOnly = true)
    public ProgressSummary summary(UUID userId) {
        LearnerStats stats = repository.stats(userId);
        LocalDate today = AppTime.localDate(Instant.now(clock));
        return new ProgressSummary(stats.totalXp(), NightClock.of(stats.totalXp()), stats.completedLessonIds().size(),
                catalog.catalog().lessons().size(), repository.earnedBadges(userId).size(),
                repository.badgeDefinitions().size(), Streak.current(stats.activeDays(), today),
                Streak.longest(stats.activeDays()), stats.attemptCount(), stats.activeDays().contains(today));
    }

    @Transactional(readOnly = true)
    public LearnerStats stats(UUID userId) {
        return repository.stats(userId);
    }

    public void recordXp(UUID userId, int amount, int lessonId, UUID attemptId, Instant at) {
        if (amount > 0) {
            repository.recordXp(userId, amount, lessonId, attemptId, at);
        }
    }

    /** Daily XP for the last {@code days} days, with a running total for the profile chart. */
    @Transactional(readOnly = true)
    public List<XpDay> xpHistory(UUID userId, int days) {
        LocalDate today = AppTime.localDate(Instant.now(clock));
        LocalDate since = today.minusDays(days - 1L);
        Map<LocalDate, Integer> perDay = repository.xpPerDay(userId, since);
        int inWindow = perDay.values().stream().mapToInt(Integer::intValue).sum();
        int running = repository.stats(userId).totalXp() - inWindow;
        List<XpDay> history = new ArrayList<>();
        for (LocalDate day = since; !day.isAfter(today); day = day.plusDays(1)) {
            int xp = perDay.getOrDefault(day, 0);
            running += xp;
            history.add(new XpDay(day, xp, running));
        }
        return history;
    }
}
