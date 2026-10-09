package com.skillhub.identity.infrastructure;

import com.skillhub.identity.domain.NewUser;
import com.skillhub.identity.domain.User;
import com.skillhub.identity.domain.UserRepository;
import com.skillhub.shared.time.AppTime;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
class JdbcUserRepository implements UserRepository {

    private static final String COLUMNS =
            "id, email, password_hash, display_name, city_id, university, created_at";
    private static final RowMapper<User> MAPPER = JdbcUserRepository::map;

    private final JdbcClient jdbc;

    JdbcUserRepository(JdbcClient jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Optional<User> findById(UUID id) {
        return jdbc.sql("SELECT " + COLUMNS + " FROM users WHERE id = :id")
                .param("id", id).query(MAPPER).optional();
    }

    @Override
    public Optional<User> findByEmail(String normalizedEmail) {
        return jdbc.sql("SELECT " + COLUMNS + " FROM users WHERE lower(email) = :email")
                .param("email", normalizedEmail).query(MAPPER).optional();
    }

    @Override
    public boolean existsByEmail(String normalizedEmail) {
        return jdbc.sql("SELECT EXISTS (SELECT 1 FROM users WHERE lower(email) = :email)")
                .param("email", normalizedEmail).query(Boolean.class).single();
    }

    @Override
    public User insert(NewUser user) {
        return jdbc.sql("""
                        INSERT INTO users (email, password_hash, display_name, city_id, university, created_at)
                        VALUES (:email, :hash, :name, :city, :university, :createdAt)
                        RETURNING\s""" + COLUMNS)
                .param("email", user.email())
                .param("hash", user.passwordHash())
                .param("name", user.displayName())
                .param("city", user.cityId())
                .param("university", user.university())
                .param("createdAt", AppTime.toDb(user.createdAt()))
                .query(MAPPER).single();
    }

    @Override
    public void updateProfile(UUID id, String displayName, int cityId, String university) {
        jdbc.sql("UPDATE users SET display_name = :name, city_id = :city, university = :university WHERE id = :id")
                .param("name", displayName).param("city", cityId).param("university", university).param("id", id)
                .update();
    }

    @Override
    public long count() {
        return jdbc.sql("SELECT count(*) FROM users").query(Long.class).single();
    }

    private static User map(ResultSet rs, int row) throws SQLException {
        return new User(
                rs.getObject("id", UUID.class),
                rs.getString("email"),
                rs.getString("password_hash"),
                rs.getString("display_name"),
                rs.getInt("city_id"),
                rs.getString("university"),
                rs.getObject("created_at", OffsetDateTime.class).toInstant());
    }
}
