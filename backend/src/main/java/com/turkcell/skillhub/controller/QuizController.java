package com.turkcell.skillhub.controller;

import com.turkcell.skillhub.dto.request.QuizSubmitRequest;
import com.turkcell.skillhub.dto.response.QuizQuestionDTO;
import com.turkcell.skillhub.dto.response.QuizSubmitResponse;
import com.turkcell.skillhub.service.QuizService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@RequiredArgsConstructor
@CrossOrigin
@Tag(name = "Quiz Sistemi", description = "Quiz sorularını getirme ve cevap gönderme API'leri")
public class QuizController {

    private final QuizService quizService;

    @Operation(
            summary = "Derse Ait Quiz Sorularını Getir",
            description = "Belirli bir derse ait tüm quiz sorularını ve seçeneklerini döndürür."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Başarılı - Quiz soruları döndürüldü",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = QuizQuestionDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Ders bulunamadı",
                    content = @Content
            )
    })
    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<List<QuizQuestionDTO>> getQuizByLesson(
            @Parameter(description = "Ders ID'si (örn: L1, L2)", required = true)
            @PathVariable String lessonId) {
        List<QuizQuestionDTO> questions = quizService.getQuizByLesson(lessonId);
        return ResponseEntity.ok(questions);
    }

    @Operation(
            summary = "Quiz Cevaplarını Gönder ve Değerlendir",
            description = "Kullanıcının quiz cevaplarını alır, değerlendirir, puanı hesaplar ve varsa yeni rozetleri verir. " +
                    "Sistem otomatik olarak: 3+ ders tamamlama için 'Motivasyon Rozeti', " +
                    "10+ quizde %80+ başarı için 'Uzman Rozeti' verir."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Başarılı - Quiz değerlendirildi ve sonuç döndürüldü",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = QuizSubmitResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Geçersiz istek - Cevap formatı hatalı",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Kullanıcı veya ders bulunamadı",
                    content = @Content
            )
    })
    @PostMapping("/submit")
    public ResponseEntity<QuizSubmitResponse> submitQuiz(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Quiz cevapları (userId, lessonId ve cevap listesi)",
                    required = true,
                    content = @Content(schema = @Schema(implementation = QuizSubmitRequest.class))
            )
            @Valid @RequestBody QuizSubmitRequest request) {
        QuizSubmitResponse response = quizService.submitQuiz(request);
        return ResponseEntity.ok(response);
    }
}

