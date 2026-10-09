package com.skillhub.progress.domain.badge;

import com.skillhub.progress.domain.NightClock;
import com.skillhub.progress.domain.Streak;
import com.skillhub.shared.time.AppTime;

/** Badges that celebrate milestones and habits. Each record is one independent strategy. */
public final class AchievementRules {

    private AchievementRules() {
    }

    /** İlk Yıldız: the first completed lesson. */
    public record FirstStar() implements BadgeRule {
        public String code() {
            return "ILK_YILDIZ";
        }

        public boolean isEarned(BadgeContext ctx) {
            return !ctx.stats().completedLessonIds().isEmpty();
        }
    }

    /** Kusursuz Gece: a quiz finished with 100%. */
    public record PerfectScore() implements BadgeRule {
        public String code() {
            return "KUSURSUZ";
        }

        public boolean isEarned(BadgeContext ctx) {
            return ctx.stats().bestScores().containsValue(100);
        }
    }

    /** Alev Serisi / Kesintisiz Hafta: learning on consecutive days. */
    public record DailyStreak(String code, int days) implements BadgeRule {
        public boolean isEarned(BadgeContext ctx) {
            return Streak.current(ctx.stats().activeDays(), AppTime.localDate(ctx.trigger().at())) >= days;
        }
    }

    /** Azimli: passing a quiz that was failed before. */
    public record Comeback() implements BadgeRule {
        public String code() {
            return "AZIMLI";
        }

        public boolean isEarned(BadgeContext ctx) {
            return ctx.trigger().passed() && ctx.trigger().failedBefore();
        }
    }

    /** Gece Kuşu (secret): "A real coder works at night." Completing a quiz between 00:00 and 05:00. */
    public record NightOwl() implements BadgeRule {
        public String code() {
            return "GECE_KUSU";
        }

        public boolean isEarned(BadgeContext ctx) {
            return AppTime.localHour(ctx.trigger().at()) < 5;
        }
    }

    /** Şafak: the night clock reaches 07:00. */
    public record Dawn() implements BadgeRule {
        public String code() {
            return "SAFAK";
        }

        public boolean isEarned(BadgeContext ctx) {
            return NightClock.of(ctx.stats().totalXp()).dawn();
        }
    }
}
