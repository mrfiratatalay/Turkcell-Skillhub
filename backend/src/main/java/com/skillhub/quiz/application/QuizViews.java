package com.skillhub.quiz.application;

import com.skillhub.catalog.application.CatalogViews.LessonRef;
import com.skillhub.progress.application.BadgeService.BadgeView;
import com.skillhub.progress.domain.NightClock;
import java.util.List;
import java.util.UUID;

public final class QuizViews {

    private QuizViews() {
    }

    public record OptionView(int id, String label) {
    }

    public record QuestionView(int id, int position, String prompt, List<OptionView> options) {
    }

    public record QuizView(String lessonSlug, String lessonTitle, int passingScore, int xpReward,
                           Integer bestScore, List<QuestionView> questions) {
    }

    public record ReviewItem(int questionId, String prompt, List<OptionView> options, int selectedOptionId,
                             int correctOptionId, boolean correct, String explanation) {
    }

    public record AttemptResult(UUID attemptId, String lessonSlug, String lessonTitle, int score, int correctCount,
                                int questionCount, boolean passed, int passingScore, Integer previousBestScore,
                                int xpEarned, int totalXp, NightClock nightClockBefore, NightClock nightClockAfter,
                                boolean leveledUp, List<BadgeView> newBadges, List<LessonRef> unlockedLessons,
                                List<ReviewItem> review) {
    }
}
