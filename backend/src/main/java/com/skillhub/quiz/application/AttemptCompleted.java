package com.skillhub.quiz.application;

import java.util.UUID;

/** Published after a quiz attempt is stored; listeners (e.g. the guide cache) react without coupling to quiz. */
public record AttemptCompleted(UUID userId, int lessonId) {
}
