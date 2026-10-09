package com.skillhub.progress.domain;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Set;
import java.util.TreeSet;

/** Consecutive learning days. A streak stays alive until the end of the day after the last activity. */
public final class Streak {

    private Streak() {
    }

    public static int current(Collection<LocalDate> activeDays, LocalDate today) {
        Set<LocalDate> days = Set.copyOf(activeDays);
        LocalDate cursor = days.contains(today) ? today : today.minusDays(1);
        int streak = 0;
        while (days.contains(cursor)) {
            streak++;
            cursor = cursor.minusDays(1);
        }
        return streak;
    }

    public static int longest(Collection<LocalDate> activeDays) {
        int longest = 0;
        int run = 0;
        LocalDate previous = null;
        for (LocalDate day : new TreeSet<>(activeDays)) {
            run = previous != null && previous.plusDays(1).equals(day) ? run + 1 : 1;
            longest = Math.max(longest, run);
            previous = day;
        }
        return longest;
    }
}
