package com.skillhub.progress.domain;

public record BadgeDefinition(String code, String name, String description, String hint, String icon, String tier,
                              boolean secret, int sortOrder) {
}
