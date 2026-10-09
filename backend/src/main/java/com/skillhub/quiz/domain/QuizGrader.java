package com.skillhub.quiz.domain;

import com.skillhub.catalog.domain.LessonStatusPolicy;
import com.skillhub.quiz.domain.GradedQuiz.GradedAnswer;
import com.skillhub.shared.error.DomainException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/** Pure grading: validates the answer sheet and scores it. The client never sees correct answers. */
public final class QuizGrader {

    private QuizGrader() {
    }

    public static GradedQuiz grade(List<Question> questions, List<Answer> answers) {
        if (questions.isEmpty()) {
            throw new DomainException.NotFound("Bu dersin henüz bir quiz'i yok.");
        }
        Map<Integer, Answer> byQuestion = indexAnswers(answers);
        List<GradedAnswer> graded = new ArrayList<>();
        for (Question question : questions) {
            Answer answer = byQuestion.get(question.id());
            if (answer == null) {
                throw new DomainException.Invalid("Quiz'i bitirmek için tüm soruları cevaplamalısın.");
            }
            if (!question.hasOption(answer.optionId())) {
                throw new DomainException.Invalid("Seçilen şık bu soruya ait değil.");
            }
            int correctId = question.correctOptionId();
            graded.add(new GradedAnswer(question.id(), answer.optionId(), correctId, answer.optionId() == correctId));
        }
        if (byQuestion.size() != questions.size()) {
            throw new DomainException.Invalid("Cevaplar bu quiz'in sorularıyla eşleşmiyor.");
        }
        int correct = (int) graded.stream().filter(GradedAnswer::correct).count();
        int score = Math.round(correct * 100f / questions.size());
        return new GradedQuiz(score, correct, questions.size(), LessonStatusPolicy.isPassing(score), graded);
    }

    private static Map<Integer, Answer> indexAnswers(List<Answer> answers) {
        try {
            return answers.stream().collect(Collectors.toMap(Answer::questionId, Function.identity()));
        } catch (IllegalStateException duplicate) {
            throw new DomainException.Invalid("Bir soruya yalnızca bir kez cevap verilebilir.");
        }
    }
}
