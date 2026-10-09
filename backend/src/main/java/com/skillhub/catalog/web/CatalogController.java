package com.skillhub.catalog.web;

import com.skillhub.catalog.application.CatalogViews.LessonCardView;
import com.skillhub.catalog.application.CatalogViews.LessonDetailView;
import com.skillhub.catalog.application.CatalogViews.SkyView;
import com.skillhub.catalog.application.LessonQueryService;
import com.skillhub.catalog.application.LessonQueryService.LessonFilter;
import com.skillhub.catalog.application.SkyQueryService;
import com.skillhub.catalog.domain.Difficulty;
import com.skillhub.shared.web.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Gökyüzü ve Dersler")
class CatalogController {

    private final SkyQueryService sky;
    private final LessonQueryService lessons;

    CatalogController(SkyQueryService sky, LessonQueryService lessons) {
        this.sky = sky;
        this.lessons = lessons;
    }

    @GetMapping("/sky")
    @Operation(summary = "Kullanıcının gökyüzü: takımyıldızlar, yıldızlar ve ön koşul çizgileri")
    SkyView sky(@CurrentUser UUID userId) {
        return sky.sky(userId);
    }

    @GetMapping("/lessons")
    @Operation(summary = "Ders kataloğu (kategori, zorluk ve metinle filtrelenebilir)")
    List<LessonCardView> list(@CurrentUser UUID userId,
                              @RequestParam(required = false) String category,
                              @RequestParam(required = false) Difficulty difficulty,
                              @RequestParam(required = false) String q) {
        return lessons.list(userId, new LessonFilter(category, difficulty, q));
    }

    @GetMapping("/lessons/{slug}")
    @Operation(summary = "Ders detayı; kilitliyse açılış yolu da döner")
    LessonDetailView detail(@CurrentUser UUID userId, @PathVariable String slug) {
        return lessons.detail(userId, slug);
    }
}
