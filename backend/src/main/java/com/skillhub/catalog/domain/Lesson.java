package com.skillhub.catalog.domain;

/** A lesson (a star). Long-form content is loaded separately, only for the detail page. */
public record Lesson(
        int id,
        String slug,
        int categoryId,
        String title,
        String summary,
        Difficulty difficulty,
        int durationMin,
        int xpReward,
        int starX,
        int starY,
        int sortOrder,
        int questionCount) {
}
