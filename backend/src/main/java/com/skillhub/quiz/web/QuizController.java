package com.skillhub.quiz.web;

import com.skillhub.quiz.application.QuizService;
import com.skillhub.quiz.application.QuizViews.AttemptResult;
import com.skillhub.quiz.application.QuizViews.QuizView;
import com.skillhub.quiz.domain.Answer;
import com.skillhub.quiz.domain.QuizRepository.AttemptRecord;
import com.skillhub.shared.web.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Quiz")
class QuizController {

    private final QuizService quizzes;

    QuizController(QuizService quizzes) {
        this.quizzes = quizzes;
    }

    @GetMapping("/lessons/{slug}/quiz")
    @Operation(summary = "Dersin quiz'i (doğru cevaplar istemciye gönderilmez)")
    QuizView quiz(@CurrentUser UUID userId, @PathVariable String slug) {
        return quizzes.quiz(userId, slug);
    }

    @PostMapping("/lessons/{slug}/attempts")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Quiz'i gönder: sunucuda puanlanır, XP ve rozetler aynı transaction'da işlenir")
    AttemptResult submit(@CurrentUser UUID userId, @PathVariable String slug,
                         @Valid @RequestBody SubmitAttemptRequest request) {
        List<Answer> answers = request.answers().stream()
                .map(a -> new Answer(a.questionId(), a.optionId()))
                .toList();
        return quizzes.submit(userId, slug, answers);
    }

    @GetMapping("/me/attempts")
    @Operation(summary = "Son quiz denemeleri")
    List<AttemptRecord> history(@CurrentUser UUID userId, @RequestParam(defaultValue = "20") int limit) {
        return quizzes.history(userId, Math.clamp(limit, 1, 100));
    }

    record SubmitAttemptRequest(@NotEmpty(message = "En az bir cevap gönder.") List<@Valid AnswerRequest> answers) {
    }

    record AnswerRequest(@Positive int questionId, @Positive int optionId) {
    }
}
