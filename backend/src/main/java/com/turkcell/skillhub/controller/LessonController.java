package com.turkcell.skillhub.controller;

import com.turkcell.skillhub.dto.response.LessonDTO;
import com.turkcell.skillhub.service.LessonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lessons")
@RequiredArgsConstructor
@CrossOrigin
@Tag(name = "Eğitim Dersleri", description = "Ders içeriklerini listeleme ve detay görüntüleme API'leri")
public class LessonController {

    private final LessonService lessonService;

    @Operation(
            summary = "Dersleri Listele",
            description = "Tüm dersleri veya belirli bir kategoriye ait dersleri döndürür. " +
                    "Kategori ID'si verilirse sadece o kategorideki dersler listelenir."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Başarılı - Ders listesi döndürüldü",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = LessonDTO.class)
                    )
            )
    })
    @GetMapping
    public ResponseEntity<List<LessonDTO>> getAllLessons(
            @Parameter(description = "Kategori ID'si filtresi (opsiyonel). Örn: C1, C2", required = false)
            @RequestParam(required = false) String categoryId) {
        List<LessonDTO> lessons;
        
        if (categoryId != null && !categoryId.isEmpty()) {
            lessons = lessonService.getLessonsByCategory(categoryId);
        } else {
            lessons = lessonService.getAllLessons();
        }
        
        return ResponseEntity.ok(lessons);
    }

    @Operation(
            summary = "Ders Detayını Getir",
            description = "Belirli bir dersin detaylı bilgilerini (başlık, açıklama, süre, zorluk, video URL) döndürür."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Başarılı - Ders detayı döndürüldü",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = LessonDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Ders bulunamadı",
                    content = @Content
            )
    })
    @GetMapping("/{lessonId}")
    public ResponseEntity<LessonDTO> getLessonById(
            @Parameter(description = "Ders ID'si (örn: L1, L2)", required = true)
            @PathVariable String lessonId) {
        LessonDTO lesson = lessonService.getLessonById(lessonId);
        return ResponseEntity.ok(lesson);
    }
}

