package com.skillhub.catalog.application;

import com.skillhub.catalog.domain.Category;
import com.skillhub.catalog.domain.Difficulty;
import com.skillhub.catalog.domain.LessonStatus;
import java.util.List;

/** Read models returned by the catalog queries (serialized as-is by the web layer). */
public final class CatalogViews {

    private CatalogViews() {
    }

    public record CategoryRef(String slug, String name, String constellation, String icon) {
        public static CategoryRef from(Category category) {
            return new CategoryRef(category.slug(), category.name(), category.constellation(), category.icon());
        }
    }

    public record LessonRef(String slug, String title, LessonStatus status) {
    }

    public record StarView(String slug, String title, LessonStatus status, int x, int y, Difficulty difficulty,
                           int xpReward, Integer bestScore) {
    }

    public record ConstellationView(String slug, String name, String constellation, String icon, String description,
                                    int completed, int total, List<StarView> stars) {
    }

    public record LinkView(String from, String to, boolean crossConstellation, boolean lit) {
    }

    public record SkyView(List<ConstellationView> constellations, List<LinkView> links, int completed, int total) {
    }

    public record LessonCardView(String slug, String title, String summary, CategoryRef category,
                                 Difficulty difficulty, int durationMin, int xpReward, int questionCount,
                                 LessonStatus status, Integer bestScore, List<String> missingPrerequisites) {
    }

    public record LessonDetailView(String slug, String title, String summary, List<String> objectives,
                                   List<String> paragraphs, String videoId, CategoryRef category,
                                   Difficulty difficulty, int durationMin, int xpReward, int questionCount,
                                   LessonStatus status, Integer bestScore, int attempts,
                                   List<LessonRef> prerequisites, List<LessonRef> unlockPath,
                                   List<LessonRef> unlocks) {
    }
}
