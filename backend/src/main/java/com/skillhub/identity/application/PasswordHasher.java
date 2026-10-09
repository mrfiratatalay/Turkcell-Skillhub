package com.skillhub.identity.application;

/** Port: hashing strategy stays an infrastructure detail (BCrypt today, Argon2 tomorrow). */
public interface PasswordHasher {

    String hash(String rawPassword);

    boolean matches(String rawPassword, String hash);
}
