package com.skillhub.progress.domain.badge;

import com.skillhub.catalog.domain.Catalog;
import com.skillhub.catalog.domain.Category;
import com.skillhub.catalog.domain.Lesson;
import java.util.Set;

/** Badges about exploring the sky: finishing constellations and visiting different ones. */
public final class ExplorationRules {

    private ExplorationRules() {
    }

    /** A constellation badge (Kod Avcısı, Sinir Ağı, Kalkan, Roket): every lesson of a category completed. */
    public record Constellation(String code, String categorySlug) implements BadgeRule {
        public boolean isEarned(BadgeContext ctx) {
            Catalog catalog = ctx.catalog();
            Set<Integer> completed = ctx.stats().completedLessonIds();
            return catalog.categories().stream()
                    .filter(c -> c.slug().equals(categorySlug))
                    .map(Category::id)
                    .findFirst()
                    .map(id -> catalog.lessonsIn(id).stream().map(Lesson::id).allMatch(completed::contains))
                    .orElse(false);
        }
    }

    /** Meraklı Gezgin: lessons completed in at least three different constellations. */
    public record Explorer(int constellations) implements BadgeRule {
        public String code() {
            return "MERAKLI_GEZGIN";
        }

        public boolean isEarned(BadgeContext ctx) {
            long visited = ctx.stats().completedLessonIds().stream()
                    .map(id -> ctx.catalog().lesson(id).categoryId())
                    .distinct()
                    .count();
            return visited >= constellations;
        }
    }
}
