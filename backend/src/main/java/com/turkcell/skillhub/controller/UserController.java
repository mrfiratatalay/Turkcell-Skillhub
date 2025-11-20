package com.turkcell.skillhub.controller;

import com.turkcell.skillhub.dto.response.UserProgressResponse;
import com.turkcell.skillhub.service.UserService;
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

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin
@Tag(name = "Kullanıcı Yönetimi", description = "Kullanıcı profil ve ilerleme bilgileri API'leri")
public class UserController {

    private final UserService userService;

    @Operation(
            summary = "Kullanıcı İlerlemesini Getir",
            description = "Belirli bir kullanıcının toplam puanını, tamamlanan ders sayısını, başarı yüzdesini ve kazanılan rozetlerini döndürür."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Başarılı - Kullanıcı ilerleme bilgileri döndürüldü",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserProgressResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Kullanıcı bulunamadı",
                    content = @Content
            )
    })
    @GetMapping("/{userId}/progress")
    public ResponseEntity<UserProgressResponse> getUserProgress(
            @Parameter(description = "Kullanıcı ID'si (örn: U1, U2)", required = true)
            @PathVariable String userId) {
        UserProgressResponse response = userService.getUserProgress(userId);
        return ResponseEntity.ok(response);
    }
}

