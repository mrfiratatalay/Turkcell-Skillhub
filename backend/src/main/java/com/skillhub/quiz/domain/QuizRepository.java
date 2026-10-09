package com.skillhub.quiz.domain;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface QuizRepository {

    List<Question> questionsFor(int lessonId);

    UUID saveAttempt(UUID userId, int lessonId, GradedQuiz graded, Instant completedAt);

    List<AttemptRecord> recentAttempts(UUID userId, int limit);

    record AttemptRecord(UUID attemptId, String lessonSlug, String lessonTitle, String categorySlug, int score,
                         boolean passed, int xpEarned, Instant completedAt) {
    }
}
