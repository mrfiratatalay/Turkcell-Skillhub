package com.skillhub.catalog.application;

import com.skillhub.catalog.application.CatalogViews.CategoryRef;
import com.skillhub.catalog.application.CatalogViews.LessonCardView;
import com.skillhub.catalog.application.CatalogViews.LessonDetailView;
import com.skillhub.catalog.application.CatalogViews.LessonRef;
import com.skillhub.catalog.domain.Catalog;
import com.skillhub.catalog.domain.Difficulty;
import com.skillhub.catalog.domain.Lesson;
import com.skillhub.catalog.domain.LessonContent;
import com.skillhub.catalog.domain.LessonStatus;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.function.Predicate;
import org.springframework.stereotype.Service;

@Service
public class LessonQueryService {

    private static final Locale TURKISH = Locale.forLanguageTag("tr-TR");

    private final CatalogService catalogService;

    public LessonQueryService(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    public record LessonFilter(String categorySlug, Difficulty difficulty, String query) {
    }

    public List<LessonCardView> list(UUID userId, LessonFilter filter) {
        LearnerCatalog learner = catalogService.forLearner(userId);
        return learner.catalog().lessons().stream()
                .filter(matches(filter, learner.catalog()))
                .map(lesson -> card(lesson, learner))
                .toList();
    }

    public LessonDetailView detail(UUID userId, String slug) {
        Lesson lesson = catalogService.requireLesson(slug);
        LearnerCatalog learner = catalogService.forLearner(userId);
        Catalog catalog = learner.catalog();
        LessonContent content = catalogService.content(lesson.id());
        LessonStatus status = learner.statusOf(lesson.id());
        List<LessonRef> unlockPath = status == LessonStatus.LOCKED
                ? catalogService.ancestorIds(lesson.id()).stream()
                        .map(catalog::lesson)
                        .filter(l -> !learner.isCompleted(l))
                        .map(l -> ref(l, learner))
                        .toList()
                : List.of();
        return new LessonDetailView(lesson.slug(), lesson.title(), lesson.summary(), content.objectives(),
                content.paragraphs(), content.videoId(), CategoryRef.from(catalog.category(lesson.categoryId())),
                lesson.difficulty(), lesson.durationMin(), lesson.xpReward(), lesson.questionCount(), status,
                learner.bestScore(lesson.id()), learner.attempts(lesson.id()),
                catalog.prerequisitesOf(lesson.id()).stream().map(l -> ref(l, learner)).toList(),
                unlockPath,
                catalog.dependentsOf(lesson.id()).stream().map(l -> ref(l, learner)).toList());
    }

    private static LessonCardView card(Lesson lesson, LearnerCatalog learner) {
        Catalog catalog = learner.catalog();
        List<String> missing = catalog.prerequisitesOf(lesson.id()).stream()
                .filter(p -> !learner.isCompleted(p))
                .map(Lesson::title)
                .toList();
        return new LessonCardView(lesson.slug(), lesson.title(), lesson.summary(),
                CategoryRef.from(catalog.category(lesson.categoryId())), lesson.difficulty(), lesson.durationMin(),
                lesson.xpReward(), lesson.questionCount(), learner.statusOf(lesson.id()),
                learner.bestScore(lesson.id()), missing);
    }

    private static LessonRef ref(Lesson lesson, LearnerCatalog learner) {
        return new LessonRef(lesson.slug(), lesson.title(), learner.statusOf(lesson.id()));
    }

    private static Predicate<Lesson> matches(LessonFilter filter, Catalog catalog) {
        Predicate<Lesson> predicate = lesson -> true;
        if (filter.categorySlug() != null && !filter.categorySlug().isBlank()) {
            predicate = predicate.and(l -> catalog.category(l.categoryId()).slug().equals(filter.categorySlug()));
        }
        if (filter.difficulty() != null) {
            predicate = predicate.and(l -> l.difficulty() == filter.difficulty());
        }
        if (filter.query() != null && !filter.query().isBlank()) {
            String needle = filter.query().strip().toLowerCase(TURKISH);
            predicate = predicate.and(l -> (l.title() + " " + l.summary()).toLowerCase(TURKISH).contains(needle));
        }
        return predicate;
    }
}
