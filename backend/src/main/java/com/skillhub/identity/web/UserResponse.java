package com.skillhub.identity.web;

import com.skillhub.identity.application.ProfileService;
import java.time.Instant;
import java.util.UUID;

public record UserResponse(UUID id, String displayName, String email, CityRef city, String university,
                           Instant memberSince) {

    public record CityRef(int id, String name) {
    }

    public static UserResponse from(ProfileService.Profile profile) {
        var user = profile.user();
        return new UserResponse(user.id(), user.displayName(), user.email(),
                new CityRef(profile.city().id(), profile.city().name()), user.university(), user.createdAt());
    }
}
