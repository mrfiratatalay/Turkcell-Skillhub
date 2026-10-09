package com.skillhub.guide.web;

import com.skillhub.guide.application.GuideService;
import com.skillhub.guide.application.GuideService.GuideView;
import com.skillhub.shared.web.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/guide")
@Tag(name = "Gece Rehberi")
class GuideController {

    private final GuideService guide;

    GuideController(GuideService guide) {
        this.guide = guide;
    }

    @GetMapping
    @Operation(summary = "Kişisel öneriler (önbellekli); AI yoksa kural tabanlı motor cevap verir")
    GuideView guide(@CurrentUser UUID userId) {
        return guide.guide(userId);
    }

    @PostMapping("/refresh")
    @Operation(summary = "Önerileri yeniden üret (saatlik limitli)")
    GuideView refresh(@CurrentUser UUID userId) {
        return guide.refresh(userId);
    }
}
