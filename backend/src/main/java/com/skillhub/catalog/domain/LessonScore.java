package com.skillhub.catalog.domain;

/** A learner's best result and number of tries for one lesson. */
public record LessonScore(int bestScore, int attempts) {
}
