package com.skillhub.identity.web;

import com.skillhub.identity.application.ProfileService;
import com.skillhub.leaderboard.application.LeaderboardService;
import com.skillhub.progress.application.ProgressService;
import com.skillhub.progress.application.ProgressService.ProgressSummary;
import com.skillhub.shared.web.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** The signed-in learner: profile, progress summary and global rank in a single round trip. */
@RestController
@RequestMapping("/api/v1/me")
@Tag(name = "Profil")
class MeController {

    private final ProfileService profiles;
    private final ProgressService progress;
    private final LeaderboardService leaderboard;

    MeController(ProfileService profiles, ProgressService progress, LeaderboardService leaderboard) {
        this.profiles = profiles;
        this.progress = progress;
        this.leaderboard = leaderboard;
    }

    @GetMapping
    @Operation(summary = "Profil, Gece Saati, XP, seri, rozet sayısı ve genel sıra")
    MeResponse me(@CurrentUser UUID userId) {
        return new MeResponse(UserResponse.from(profiles.get(userId)), progress.summary(userId),
                leaderboard.globalRank(userId));
    }

    @PatchMapping
    @Operation(summary = "Ad, şehir ve üniversite bilgisini güncelle")
    UserResponse update(@CurrentUser UUID userId, @Valid @RequestBody UpdateProfileRequest request) {
        return UserResponse.from(profiles.update(userId,
                new ProfileService.ProfileUpdate(request.displayName(), request.cityId(), request.university())));
    }

    record MeResponse(UserResponse user, ProgressSummary progress, Integer rank) {
    }

    record UpdateProfileRequest(
            @NotBlank(message = "Ad soyad zorunlu.")
            @Size(min = 2, max = 40, message = "Ad soyad 2-40 karakter olmalı.") String displayName,
            @Min(value = 1, message = "Şehir seçmelisin.") @Max(value = 81, message = "Şehir seçmelisin.") int cityId,
            @Size(max = 120, message = "Üniversite adı çok uzun.") String university) {
    }
}
