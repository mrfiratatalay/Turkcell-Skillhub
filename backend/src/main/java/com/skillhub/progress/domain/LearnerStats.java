package com.skillhub.progress.domain;

import java.time.LocalDate;
import java.util.Map;
import java.util.Set;

/** Everything the gamification rules need to know about one learner, derived from the database. */
public record LearnerStats(
        int totalXp,
        Map<Integer, Integer> bestScores,
        Set<Integer> completedLessonIds,
        Set<LocalDate> activeDays,
        int attemptCount) {
}
