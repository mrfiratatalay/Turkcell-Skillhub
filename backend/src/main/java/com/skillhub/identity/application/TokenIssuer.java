package com.skillhub.identity.application;

import com.skillhub.identity.domain.User;
import java.time.Instant;

/** Port: how access tokens are minted is not the use case's concern. */
public interface TokenIssuer {

    IssuedToken issue(User user);

    record IssuedToken(String value, Instant expiresAt) {
    }
}
