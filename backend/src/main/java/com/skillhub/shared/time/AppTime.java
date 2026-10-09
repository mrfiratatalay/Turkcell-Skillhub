package com.skillhub.shared.time;

import java.time.Instant;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

/** Single source of truth for the platform's local time zone (streaks, "Gece Kuşu", greetings). */
public final class AppTime {

    public static final ZoneId ZONE = ZoneId.of("Europe/Istanbul");

    private AppTime() {
    }

    public static LocalDate localDate(Instant instant) {
        return instant.atZone(ZONE).toLocalDate();
    }

    public static int localHour(Instant instant) {
        return instant.atZone(ZONE).getHour();
    }

    /** PostgreSQL's JDBC driver binds OffsetDateTime natively for TIMESTAMPTZ columns. */
    public static OffsetDateTime toDb(Instant instant) {
        return instant.atOffset(ZoneOffset.UTC);
    }
}
