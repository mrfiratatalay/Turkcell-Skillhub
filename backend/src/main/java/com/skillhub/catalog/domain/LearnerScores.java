package com.skillhub.catalog.domain;

import java.util.Map;
import java.util.UUID;

/** Port: a learner's best score and attempt count per lesson id. */
public interface LearnerScores {

    Map<Integer, LessonScore> of(UUID userId);
}
