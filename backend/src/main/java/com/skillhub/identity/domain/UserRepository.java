package com.skillhub.identity.domain;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository {

    Optional<User> findById(UUID id);

    Optional<User> findByEmail(String normalizedEmail);

    boolean existsByEmail(String normalizedEmail);

    User insert(NewUser user);

    void updateProfile(UUID id, String displayName, int cityId, String university);

    long count();
}
