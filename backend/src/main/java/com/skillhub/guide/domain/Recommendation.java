package com.skillhub.guide.domain;

/** One suggestion from the night guide. lessonSlug/lessonTitle are null for habit tips (e.g. streaks). */
public record Recommendation(Kind kind, String title, String reason, String lessonSlug, String lessonTitle,
                             int priority) {

    public enum Kind {
        /** The star whose completion unlocks the most of the sky. */
        NEXT_STAR,
        /** A lesson attempted but not yet passed. */
        RETRY,
        /** Finish a nearly complete constellation. */
        CONSTELLATION,
        /** Keep the daily streak alive. */
        STREAK,
        /** Discover an untouched constellation. */
        EXPLORE,
        /** Raise a passed lesson to 100% for the remaining XP. */
        POLISH
    }
}
