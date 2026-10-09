package com.skillhub.identity.domain;

import java.time.Instant;

/** A user about to be persisted; the database assigns the id. */
public record NewUser(
        String email,
        String passwordHash,
        String displayName,
        int cityId,
        String university,
        Instant createdAt) {
}
