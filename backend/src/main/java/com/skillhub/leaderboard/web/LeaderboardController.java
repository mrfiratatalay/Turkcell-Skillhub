package com.skillhub.leaderboard.web;

import com.skillhub.leaderboard.application.LeaderboardService;
import com.skillhub.leaderboard.application.LeaderboardService.CityLightsView;
import com.skillhub.leaderboard.application.LeaderboardService.LeaderboardView;
import com.skillhub.shared.web.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/leaderboard")
@Tag(name = "Şehir Işıkları")
class LeaderboardController {

    private final LeaderboardService leaderboard;

    LeaderboardController(LeaderboardService leaderboard) {
        this.leaderboard = leaderboard;
    }

    @GetMapping
    @Operation(summary = "Bireysel sıralama; cityId verilirse şehir içi sıralama")
    LeaderboardView leaderboard(@CurrentUser UUID userId,
                                @RequestParam(required = false) Integer cityId,
                                @RequestParam(defaultValue = "50") int limit) {
        return leaderboard.leaderboard(userId, cityId, Math.clamp(limit, 3, 100));
    }

    @GetMapping("/cities")
    @Operation(summary = "Şehir ışıkları: 81 ilin toplam XP'si ve öğrenci sayısı (harita için koordinatlarla)")
    CityLightsView cities() {
        return leaderboard.cityLights();
    }
}
