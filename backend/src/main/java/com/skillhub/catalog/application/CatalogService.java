package com.skillhub.catalog.application;

import com.skillhub.catalog.domain.Catalog;
import com.skillhub.catalog.domain.CatalogRepository;
import com.skillhub.catalog.domain.LearnerScores;
import com.skillhub.catalog.domain.Lesson;
import com.skillhub.catalog.domain.LessonContent;
import com.skillhub.catalog.domain.LessonScore;
import com.skillhub.catalog.domain.LessonStatus;
import com.skillhub.catalog.domain.LessonStatusPolicy;
import com.skillhub.shared.error.DomainException;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.stereotype.Service;

/** Entry point to the catalog for other modules (quiz, progress, guide) and for the web layer. */
@Service
public class CatalogService {

    private final CatalogRepository repository;
    private final LearnerScores learnerScores;
    private volatile Catalog cached;

    public CatalogService(CatalogRepository repository, LearnerScores learnerScores) {
        this.repository = repository;
        this.learnerScores = learnerScores;
    }

    /** Content only changes through Flyway migrations, so one in-memory snapshot is enough. */
    public Catalog catalog() {
        Catalog snapshot = cached;
        if (snapshot == null) {
            snapshot = new Catalog(repository.categories(), repository.lessons(), repository.prerequisites());
            cached = snapshot;
        }
        return snapshot;
    }

    public LearnerCatalog forLearner(UUID userId) {
        Catalog catalog = catalog();
        Map<Integer, LessonScore> scores = learnerScores.of(userId);
        return new LearnerCatalog(catalog, scores, LessonStatusPolicy.evaluate(catalog, scores));
    }

    public Lesson requireLesson(String slug) {
        return catalog().lessonBySlug(slug)
                .orElseThrow(() -> new DomainException.NotFound("Bu yıldız henüz haritada yok."));
    }

    public Lesson requireUnlocked(UUID userId, String slug) {
        Lesson lesson = requireLesson(slug);
        if (forLearner(userId).statusOf(lesson.id()) == LessonStatus.LOCKED) {
            throw new DomainException.Forbidden("Bu yıldız henüz kilitli",
                    "Bu dersin quiz'ini çözmek için önce ön koşul derslerini tamamlamalısın.");
        }
        return lesson;
    }

    LessonContent content(int lessonId) {
        return repository.content(lessonId);
    }

    List<Integer> ancestorIds(int lessonId) {
        return repository.ancestorIds(lessonId);
    }
}
