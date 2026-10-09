package com.skillhub.progress.domain.badge;

/**
 * Strategy for one badge. Adding a badge means adding a rule, never editing existing ones (Open/Closed).
 */
public interface BadgeRule {

    String code();

    boolean isEarned(BadgeContext context);
}
