package com.skillhub.progress.web;

import com.skillhub.progress.application.BadgeService;
import com.skillhub.progress.application.BadgeService.BadgeCollection;
import com.skillhub.progress.application.ProgressService;
import com.skillhub.progress.application.ProgressService.XpDay;
import com.skillhub.shared.web.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "İlerleme ve Rozetler")
class ProgressController {

    private final BadgeService badges;
    private final ProgressService progress;

    ProgressController(BadgeService badges, ProgressService progress) {
        this.badges = badges;
        this.progress = progress;
    }

    @GetMapping("/badges")
    @Operation(summary = "Rozet koleksiyonu; kazanılmamış gizli rozetler '?' olarak döner")
    BadgeCollection badges(@CurrentUser UUID userId) {
        return badges.collection(userId);
    }

    @GetMapping("/me/xp-history")
    @Operation(summary = "Son N günün günlük ve kümülatif XP'si")
    List<XpDay> xpHistory(@CurrentUser UUID userId, @RequestParam(defaultValue = "30") int days) {
        return progress.xpHistory(userId, Math.clamp(days, 7, 90));
    }
}
