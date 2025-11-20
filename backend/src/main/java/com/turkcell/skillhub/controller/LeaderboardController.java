package com.turkcell.skillhub.controller;

import com.turkcell.skillhub.dto.response.LeaderboardEntryDTO;
import com.turkcell.skillhub.service.LeaderboardService;
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
@RequestMapping("/leaderboard")
@RequiredArgsConstructor
@CrossOrigin
@Tag(name = "Liderlik Tablosu", description = "Kullanıcı sıralama ve liderlik tablosu API'leri")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @Operation(
            summary = "Liderlik Tablosunu Getir",
            description = "Tüm kullanıcıları veya belirli bir şehirdeki kullanıcıları toplam puanlarına göre sıralı olarak döndürür. " +
                    "Şehir parametresi verilmezse tüm kullanıcılar, verilirse sadece o şehirdeki kullanıcılar listelenir."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Başarılı - Liderlik tablosu döndürüldü",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = LeaderboardEntryDTO.class)
                    )
            )
    })
    @GetMapping
    public ResponseEntity<List<LeaderboardEntryDTO>> getLeaderboard(
            @Parameter(description = "Şehir filtresi (opsiyonel). Örn: İstanbul, Ankara", required = false)
            @RequestParam(required = false) String city) {
        List<LeaderboardEntryDTO> leaderboard = leaderboardService.getLeaderboard(city);
        return ResponseEntity.ok(leaderboard);
    }
}

