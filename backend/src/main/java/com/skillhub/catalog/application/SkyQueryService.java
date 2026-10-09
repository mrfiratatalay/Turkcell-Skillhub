package com.skillhub.catalog.application;

import com.skillhub.catalog.application.CatalogViews.ConstellationView;
import com.skillhub.catalog.application.CatalogViews.LinkView;
import com.skillhub.catalog.application.CatalogViews.SkyView;
import com.skillhub.catalog.application.CatalogViews.StarView;
import com.skillhub.catalog.domain.Catalog;
import com.skillhub.catalog.domain.Category;
import com.skillhub.catalog.domain.Lesson;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

/** Builds the learner's night sky: constellations, stars and the prerequisite lines between them. */
@Service
public class SkyQueryService {

    private final CatalogService catalogService;

    public SkyQueryService(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    public SkyView sky(UUID userId) {
        LearnerCatalog learner = catalogService.forLearner(userId);
        Catalog catalog = learner.catalog();
        List<ConstellationView> constellations = catalog.categories().stream()
                .map(category -> constellation(category, learner))
                .toList();
        List<LinkView> links = catalog.prerequisites().stream().map(p -> {
            Lesson from = catalog.lesson(p.prerequisiteId());
            Lesson to = catalog.lesson(p.lessonId());
            return new LinkView(from.slug(), to.slug(), from.categoryId() != to.categoryId(), learner.isCompleted(from));
        }).toList();
        return new SkyView(constellations, links, learner.completedIds().size(), catalog.lessons().size());
    }

    private static ConstellationView constellation(Category category, LearnerCatalog learner) {
        List<Lesson> lessons = learner.catalog().lessonsIn(category.id());
        List<StarView> stars = lessons.stream()
                .map(l -> new StarView(l.slug(), l.title(), learner.statusOf(l.id()), l.starX(), l.starY(),
                        l.difficulty(), l.xpReward(), learner.bestScore(l.id())))
                .toList();
        return new ConstellationView(category.slug(), category.name(), category.constellation(), category.icon(),
                category.description(), (int) learner.completedIn(category.id()), lessons.size(), stars);
    }
}
