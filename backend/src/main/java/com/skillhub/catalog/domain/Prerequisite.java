package com.skillhub.catalog.domain;

/** Edge of the prerequisite DAG: lessonId can only be unlocked after prerequisiteId is completed. */
public record Prerequisite(int lessonId, int prerequisiteId) {
}
