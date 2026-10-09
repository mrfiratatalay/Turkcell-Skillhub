package com.skillhub.quiz.domain;

import java.util.List;

public record GradedQuiz(int score, int correctCount, int questionCount, boolean passed, List<GradedAnswer> answers) {

    public record GradedAnswer(int questionId, int selectedOptionId, int correctOptionId, boolean correct) {
    }
}
