package com.turkcell.skillhub.entity.enums;

public enum Difficulty {
    BEGINNER("Beginner"),
    INTERMEDIATE("Intermediate"),
    ADVANCED("Advanced");

    private final String displayName;

    Difficulty(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static Difficulty fromString(String text) {
        for (Difficulty diff : Difficulty.values()) {
            if (diff.displayName.equalsIgnoreCase(text) || diff.name().equalsIgnoreCase(text)) {
                return diff;
            }
        }
        return BEGINNER; // default
    }
}

