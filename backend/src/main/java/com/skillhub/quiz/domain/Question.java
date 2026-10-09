package com.skillhub.quiz.domain;

import java.util.List;

public record Question(int id, int lessonId, int position, String prompt, String explanation, List<Option> options) {

    public record Option(int id, int position, String label, boolean correct) {
    }

    public int correctOptionId() {
        return options.stream().filter(Option::correct).findFirst().orElseThrow().id();
    }

    public boolean hasOption(int optionId) {
        return options.stream().anyMatch(o -> o.id() == optionId);
    }
}
