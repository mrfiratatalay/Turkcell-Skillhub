package com.skillhub.catalog.domain;

/** How a star looks on the learner's sky. */
public enum LessonStatus {
    /** Quiz passed: the star is lit. */
    COMPLETED,
    /** Every prerequisite is lit: the star can be explored. */
    AVAILABLE,
    /** Waiting for its prerequisites. */
    LOCKED
}
