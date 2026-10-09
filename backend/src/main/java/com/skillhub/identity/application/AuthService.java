package com.skillhub.identity.application;

import com.skillhub.geo.application.CityService;
import com.skillhub.geo.domain.City;
import com.skillhub.identity.domain.NewUser;
import com.skillhub.identity.domain.User;
import com.skillhub.identity.domain.UserRepository;
import com.skillhub.shared.error.DomainException;
import java.time.Clock;
import java.time.Instant;
import java.util.Locale;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordHasher passwords;
    private final TokenIssuer tokens;
    private final CityService cities;
    private final Clock clock;
    private final String timingDecoyHash;

    public AuthService(UserRepository users, PasswordHasher passwords, TokenIssuer tokens,
                       CityService cities, Clock clock) {
        this.users = users;
        this.passwords = passwords;
        this.tokens = tokens;
        this.cities = cities;
        this.clock = clock;
        this.timingDecoyHash = passwords.hash("timing-decoy-password");
    }

    public record Registration(String email, String password, String displayName, int cityId, String university) {
    }

    public record Session(User user, City city, TokenIssuer.IssuedToken token) {
    }

    @Transactional
    public Session register(Registration request) {
        String email = normalizeEmail(request.email());
        if (users.existsByEmail(email)) {
            throw new DomainException.Conflict("Bu e-posta adresiyle zaten bir hesap var.");
        }
        City city = cities.require(request.cityId());
        User user = users.insert(new NewUser(email, passwords.hash(request.password()),
                request.displayName().strip(), city.id(), blankToNull(request.university()), Instant.now(clock)));
        return new Session(user, city, tokens.issue(user));
    }

    @Transactional(readOnly = true)
    public Session login(String email, String password) {
        Optional<User> user = users.findByEmail(normalizeEmail(email));
        // Always run a hash comparison so response time does not reveal which emails exist.
        boolean valid = passwords.matches(password, user.map(User::passwordHash).orElse(timingDecoyHash));
        if (user.isEmpty() || !valid) {
            throw new DomainException.Unauthorized("E-posta veya şifre hatalı.");
        }
        return new Session(user.get(), cities.require(user.get().cityId()), tokens.issue(user.get()));
    }

    public static String normalizeEmail(String email) {
        return email.strip().toLowerCase(Locale.ROOT);
    }

    static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.strip();
    }
}
