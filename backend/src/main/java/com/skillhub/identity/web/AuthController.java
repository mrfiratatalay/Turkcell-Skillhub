package com.skillhub.identity.web;

import com.skillhub.identity.application.AuthService;
import com.skillhub.identity.application.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Kimlik")
class AuthController {

    private final AuthService auth;

    AuthController(AuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Yeni hesap oluştur ve oturum aç")
    AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return AuthResponse.from(auth.register(new AuthService.Registration(request.email(), request.password(),
                request.displayName(), request.cityId(), request.university())));
    }

    @PostMapping("/login")
    @Operation(summary = "E-posta ve şifreyle giriş yap")
    AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return AuthResponse.from(auth.login(request.email(), request.password()));
    }

    record RegisterRequest(
            @NotBlank(message = "E-posta zorunlu.") @Email(message = "Geçerli bir e-posta gir.")
            @Size(max = 254, message = "E-posta çok uzun.") String email,
            @NotBlank(message = "Şifre zorunlu.")
            @Size(min = 8, max = 72, message = "Şifre 8-72 karakter olmalı.") String password,
            @NotBlank(message = "Ad soyad zorunlu.")
            @Size(min = 2, max = 40, message = "Ad soyad 2-40 karakter olmalı.") String displayName,
            @Min(value = 1, message = "Şehir seçmelisin.") @Max(value = 81, message = "Şehir seçmelisin.") int cityId,
            @Size(max = 120, message = "Üniversite adı çok uzun.") String university) {
    }

    record LoginRequest(
            @NotBlank(message = "E-posta zorunlu.") String email,
            @NotBlank(message = "Şifre zorunlu.") String password) {
    }

    record AuthResponse(String token, Instant expiresAt, UserResponse user) {
        static AuthResponse from(AuthService.Session session) {
            var profile = new ProfileService.Profile(session.user(), session.city());
            return new AuthResponse(session.token().value(), session.token().expiresAt(), UserResponse.from(profile));
        }
    }
}
