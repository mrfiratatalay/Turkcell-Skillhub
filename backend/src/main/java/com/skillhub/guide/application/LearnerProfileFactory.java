package com.skillhub.guide.application;

import com.skillhub.catalog.application.CatalogService;
import com.skillhub.catalog.application.LearnerCatalog;
import com.skillhub.catalog.domain.Catalog;
import com.skillhub.catalog.domain.Category;
import com.skillhub.catalog.domain.Lesson;
import com.skillhub.catalog.domain.LessonStatus;
import com.skillhub.guide.domain.LearnerProfile;
import com.skillhub.guide.domain.LearnerProfile.CandidateLesson;
import com.skillhub.guide.domain.LearnerProfile.CategoryProgress;
import com.skillhub.guide.domain.LearnerProfile.RetryCandidate;
import com.skillhub.identity.application.ProfileService;
import com.skillhub.progress.application.ProgressService;
import com.skillhub.progress.application.ProgressService.ProgressSummary;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Component;

/** Builds the guide's input from real data only. The LLM never sees more than the first name. */
@Component
class LearnerProfileFactory {

    private final CatalogService catalog;
    private final ProgressService progress;
    private final ProfileService profiles;

    LearnerProfileFactory(CatalogService catalog, ProgressService progress, ProfileService profiles) {
        this.catalog = catalog;
        this.progress = progress;
        this.profiles = profiles;
    }

    LearnerProfile build(UUID userId) {
        LearnerCatalog learner = catalog.forLearner(userId);
        Catalog content = learner.catalog();
        ProgressSummary summary = progress.summary(userId);
        String firstName = profiles.get(userId).user().displayName().split("\\s+")[0];

        List<CategoryProgress> categories = content.categories().stream()
                .map(c -> new CategoryProgress(c.slug(), c.name(), c.constellation(), (int) learner.completedIn(c.id()),
                        content.lessonsIn(c.id()).size()))
                .toList();
        List<CandidateLesson> fresh = content.lessons().stream()
                .filter(l -> learner.statusOf(l.id()) == LessonStatus.AVAILABLE && learner.attempts(l.id()) == 0)
                .map(l -> candidate(l, content))
                .toList();
        List<RetryCandidate> retry = content.lessons().stream()
                .filter(l -> learner.statusOf(l.id()) == LessonStatus.AVAILABLE && learner.attempts(l.id()) > 0)
                .map(l -> new RetryCandidate(l.slug(), l.title(), learner.bestScore(l.id())))
                .toList();
        List<RetryCandidate> polish = content.lessons().stream()
                .filter(l -> learner.isCompleted(l) && learner.bestScore(l.id()) < 100)
                .map(l -> new RetryCandidate(l.slug(), l.title(), learner.bestScore(l.id())))
                .toList();
        List<String> completed = content.lessons().stream().filter(learner::isCompleted).map(Lesson::title).toList();

        return new LearnerProfile(firstName, summary.nightClock().title(), summary.totalXp(), summary.streakDays(),
                summary.activeToday(), categories, fresh, retry, polish, completed);
    }

    private static CandidateLesson candidate(Lesson lesson, Catalog content) {
        Category category = content.category(lesson.categoryId());
        return new CandidateLesson(lesson.slug(), lesson.title(), category.slug(), category.name(),
                lesson.difficulty().name(), lesson.xpReward(), content.dependentsOf(lesson.id()).size());
    }
}
