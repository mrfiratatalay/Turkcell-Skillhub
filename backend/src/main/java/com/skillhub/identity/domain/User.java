package com.skillhub.identity.domain;

import java.time.Instant;
import java.util.UUID;

public record User(
        UUID id,
        String email,
        String passwordHash,
        String displayName,
        int cityId,
        String university,
        Instant createdAt) {
}
