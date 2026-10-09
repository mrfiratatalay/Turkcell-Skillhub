package com.skillhub.catalog.application;

import com.skillhub.catalog.domain.Catalog;
import com.skillhub.catalog.domain.Lesson;
import com.skillhub.catalog.domain.LessonScore;
import com.skillhub.catalog.domain.LessonStatus;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/** The catalog as one learner sees it: content plus their scores and the resulting star statuses. */
public record LearnerCatalog(Catalog catalog, Map<Integer, LessonScore> scores, Map<Integer, LessonStatus> statuses) {

    public LessonStatus statusOf(int lessonId) {
        return statuses.getOrDefault(lessonId, LessonStatus.LOCKED);
    }

    public Integer bestScore(int lessonId) {
        LessonScore score = scores.get(lessonId);
        return score == null ? null : score.bestScore();
    }

    public int attempts(int lessonId) {
        LessonScore score = scores.get(lessonId);
        return score == null ? 0 : score.attempts();
    }

    public Set<Integer> completedIds() {
        return statuses.entrySet().stream()
                .filter(e -> e.getValue() == LessonStatus.COMPLETED)
                .map(Map.Entry::getKey)
                .collect(Collectors.toUnmodifiableSet());
    }

    public long completedIn(int categoryId) {
        return catalog.lessonsIn(categoryId).stream().filter(l -> statusOf(l.id()) == LessonStatus.COMPLETED).count();
    }

    public boolean isCompleted(Lesson lesson) {
        return statusOf(lesson.id()) == LessonStatus.COMPLETED;
    }
}
