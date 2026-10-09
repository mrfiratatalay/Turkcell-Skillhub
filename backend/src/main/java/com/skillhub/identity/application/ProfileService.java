package com.skillhub.identity.application;

import com.skillhub.geo.application.CityService;
import com.skillhub.geo.domain.City;
import com.skillhub.identity.domain.User;
import com.skillhub.identity.domain.UserRepository;
import com.skillhub.shared.error.DomainException;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final UserRepository users;
    private final CityService cities;

    public ProfileService(UserRepository users, CityService cities) {
        this.users = users;
        this.cities = cities;
    }

    public record Profile(User user, City city) {
    }

    public record ProfileUpdate(String displayName, int cityId, String university) {
    }

    @Transactional(readOnly = true)
    public Profile get(UUID userId) {
        User user = users.findById(userId)
                .orElseThrow(() -> new DomainException.NotFound("Kullanıcı bulunamadı."));
        return new Profile(user, cities.require(user.cityId()));
    }

    @Transactional
    public Profile update(UUID userId, ProfileUpdate update) {
        City city = cities.require(update.cityId());
        get(userId);
        users.updateProfile(userId, update.displayName().strip(), city.id(), AuthService.blankToNull(update.university()));
        return get(userId);
    }
}
