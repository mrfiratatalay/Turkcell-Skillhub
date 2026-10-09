package com.skillhub.catalog.domain;

import java.util.List;

public record LessonContent(List<String> objectives, List<String> paragraphs, String videoId) {
}
