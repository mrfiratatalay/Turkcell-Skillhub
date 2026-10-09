package com.skillhub.shared.security;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app.security")
public record JwtProperties(String jwtSecret, Duration tokenTtl) {

    private static final int MIN_SECRET_BYTES = 32;

    public JwtProperties {
        if (jwtSecret == null || jwtSecret.getBytes(StandardCharsets.UTF_8).length < MIN_SECRET_BYTES) {
            throw new IllegalStateException("app.security.jwt-secret must be at least 32 bytes for HS256");
        }
    }

    public SecretKey signingKey() {
        return new SecretKeySpec(jwtSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    }
}
