package com.skillhub.shared.error;

import java.util.Map;

/**
 * Business failures raised by the domain and application layers.
 * Sealed so the web layer can map every case exhaustively, without knowing HTTP inside the domain.
 */
public abstract sealed class DomainException extends RuntimeException {

    private final String title;
    private final Map<String, String> fieldErrors;

    protected DomainException(String title, String detail) {
        this(title, detail, Map.of());
    }

    protected DomainException(String title, String detail, Map<String, String> fieldErrors) {
        super(detail);
        this.title = title;
        this.fieldErrors = Map.copyOf(fieldErrors);
    }

    public String title() {
        return title;
    }

    /** Messages to show next to specific form fields (field name to message); empty for most failures. */
    public Map<String, String> fieldErrors() {
        return fieldErrors;
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

        /** A conflict caused by one form field, e.g. an e-mail address that is already registered. */
        public Conflict(String detail, String field) {
            super("Çakışma", detail, Map.of(field, detail));
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

        /** An invalid value in one form field, reported where the user can fix it. */
        public Invalid(String detail, String field) {
            super("Geçersiz istek", detail, Map.of(field, detail));
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
