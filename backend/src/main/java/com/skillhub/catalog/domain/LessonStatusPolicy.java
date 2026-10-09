package com.skillhub.catalog.domain;

import java.util.LinkedHashMap;
import java.util.Map;

/** Pure rule: which stars are lit, which can be explored, which are still locked. */
public final class LessonStatusPolicy {

    /** Minimum quiz score (percent) that completes a lesson. */
    public static final int PASSING_SCORE = 70;

    private LessonStatusPolicy() {
    }

    public static boolean isPassing(int score) {
        return score >= PASSING_SCORE;
    }

    public static Map<Integer, LessonStatus> evaluate(Catalog catalog, Map<Integer, LessonScore> scores) {
        Map<Integer, LessonStatus> statuses = new LinkedHashMap<>();
        for (Lesson lesson : catalog.lessons()) {
            statuses.put(lesson.id(), statusOf(lesson, catalog, scores));
        }
        return statuses;
    }

    private static LessonStatus statusOf(Lesson lesson, Catalog catalog, Map<Integer, LessonScore> scores) {
        if (isCompleted(lesson.id(), scores)) {
            return LessonStatus.COMPLETED;
        }
        boolean unlocked = catalog.prerequisitesOf(lesson.id()).stream().allMatch(p -> isCompleted(p.id(), scores));
        return unlocked ? LessonStatus.AVAILABLE : LessonStatus.LOCKED;
    }

    private static boolean isCompleted(int lessonId, Map<Integer, LessonScore> scores) {
        LessonScore score = scores.get(lessonId);
        return score != null && isPassing(score.bestScore());
    }
}
