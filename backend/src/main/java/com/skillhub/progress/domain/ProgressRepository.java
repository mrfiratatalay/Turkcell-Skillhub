package com.skillhub.progress.domain;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/** Port for the append-only XP ledger and the stats derived from attempts. */
public interface ProgressRepository {

    void recordXp(UUID userId, int amount, int lessonId, UUID attemptId, Instant at);

    LearnerStats stats(UUID userId);

    /** XP earned per local day (Europe/Istanbul) since the given date. */
    Map<LocalDate, Integer> xpPerDay(UUID userId, LocalDate since);

    List<BadgeDefinition> badgeDefinitions();

    Map<String, Instant> earnedBadges(UUID userId);

    /** Idempotent: awarding an already earned badge is a no-op. Returns true if newly awarded. */
    boolean awardBadge(UUID userId, String code, Instant at);
}
