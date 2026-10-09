package com.skillhub.progress.domain;

/**
 * XP is earned only for improvement: retaking a quiz pays the difference over your previous best.
 * The hackathon version added points on every submission, so the same quiz could be farmed forever.
 */
public final class XpPolicy {

    private XpPolicy() {
    }

    public static int earned(int xpReward, Integer previousBestScore, int newScore) {
        int alreadyEarned = previousBestScore == null ? 0 : xpForScore(xpReward, previousBestScore);
        return Math.max(0, xpForScore(xpReward, newScore) - alreadyEarned);
    }

    static int xpForScore(int xpReward, int score) {
        return Math.round(xpReward * score / 100f);
    }
}
