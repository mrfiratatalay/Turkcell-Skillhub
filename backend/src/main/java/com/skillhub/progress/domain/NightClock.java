package com.skillhub.progress.domain;

/**
 * "Gece Saati": the level system mirrors the real Code Night, which ran from 17:00 until 07:00.
 * Every level is a two-hour slice of the night; XP moves the clock forward until dawn.
 */
public record NightClock(
        int level,
        String title,
        String time,
        double levelProgress,
        double nightProgress,
        int levelStartXp,
        Integer nextLevelXp,
        boolean dawn) {

    private static final int[] THRESHOLDS = {0, 150, 400, 700, 1050, 1450, 1900, 2350};
    private static final String[] TITLES = {
            "Alacakaranlık", "Akşam Yıldızı", "Gece Çöktü", "Gece Yarısına Doğru",
            "Gece Yarısı Geçti", "Derin Gece", "Tan Ağarıyor", "Şafak"
    };
    private static final int START_MINUTE = 17 * 60;
    private static final int LEVEL_MINUTES = 120;

    public static NightClock of(int totalXp) {
        int xp = Math.max(0, totalXp);
        int index = levelIndex(xp);
        int finalXp = THRESHOLDS[THRESHOLDS.length - 1];
        double night = Math.min(1.0, (double) xp / finalXp);
        if (index == THRESHOLDS.length - 1) {
            return new NightClock(index + 1, TITLES[index], "07:00", 1.0, 1.0, THRESHOLDS[index], null, true);
        }
        int start = THRESHOLDS[index];
        int next = THRESHOLDS[index + 1];
        double fraction = (double) (xp - start) / (next - start);
        int minuteOfDay = (START_MINUTE + index * LEVEL_MINUTES + (int) Math.floor(fraction * LEVEL_MINUTES)) % (24 * 60);
        String time = "%02d:%02d".formatted(minuteOfDay / 60, minuteOfDay % 60);
        return new NightClock(index + 1, TITLES[index], time, fraction, night, start, next, false);
    }

    public static int levelOf(int totalXp) {
        return levelIndex(Math.max(0, totalXp)) + 1;
    }

    private static int levelIndex(int xp) {
        int index = 0;
        for (int i = 0; i < THRESHOLDS.length; i++) {
            if (xp >= THRESHOLDS[i]) {
                index = i;
            }
        }
        return index;
    }
}
