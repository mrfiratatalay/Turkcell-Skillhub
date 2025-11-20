package com.turkcell.skillhub.entity.enums;

public enum SkillLevel {
    BEGINNER("Beginner"),
    INTERMEDIATE("Intermediate"),
    ADVANCED("Advanced");

    private final String displayName;

    SkillLevel(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static SkillLevel fromString(String text) {
        for (SkillLevel level : SkillLevel.values()) {
            if (level.displayName.equalsIgnoreCase(text) || level.name().equalsIgnoreCase(text)) {
                return level;
            }
        }
        return BEGINNER; // default
    }
}

