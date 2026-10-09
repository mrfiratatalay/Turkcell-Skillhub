package com.skillhub.guide.domain;

import java.util.List;

/** The only data the guide (rule engine or LLM) may use: the learner's real progress, nothing invented. */
public record LearnerProfile(
        String displayName,
        String levelTitle,
        int totalXp,
        int streakDays,
        boolean activeToday,
        List<CategoryProgress> categories,
        List<CandidateLesson> available,
        List<RetryCandidate> retry,
        List<RetryCandidate> polish,
        List<String> completedTitles) {

    public record CategoryProgress(String slug, String name, String constellation, int completed, int total) {
    }

    /** An unlocked, not yet completed lesson; {@code unlocks} = how many lessons depend on it. */
    public record CandidateLesson(String slug, String title, String categorySlug, String categoryName,
                                  String difficulty, int xpReward, int unlocks) {
    }

    public record RetryCandidate(String slug, String title, int bestScore) {
    }
}
