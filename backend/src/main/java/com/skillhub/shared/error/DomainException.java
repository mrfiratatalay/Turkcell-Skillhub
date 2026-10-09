package com.skillhub.shared.error;

/**
 * Business failures raised by the domain and application layers.
 * Sealed so the web layer can map every case exhaustively, without knowing HTTP inside the domain.
 */
public abstract sealed class DomainException extends RuntimeException {

    private final String title;

    protected DomainException(String title, String detail) {
        super(detail);
        this.title = title;
    }

    public String title() {
        return title;
    }

    public static final class NotFound extends DomainException {
        public NotFound(String detail) {
            super("Bulunamadı", detail);
        }
    }

    public static final class Conflict extends DomainException {
        public Conflict(String detail) {
            super("Çakışma", detail);
        }
    }

    public static final class Forbidden extends DomainException {
        public Forbidden(String title, String detail) {
            super(title, detail);
        }
    }

    public static final class Invalid extends DomainException {
        public Invalid(String detail) {
            super("Geçersiz istek", detail);
        }
    }

    public static final class Unauthorized extends DomainException {
        public Unauthorized(String detail) {
            super("Kimlik doğrulanamadı", detail);
        }
    }

    public static final class RateLimited extends DomainException {
        public RateLimited(String detail) {
            super("Çok fazla istek", detail);
        }
    }
}
