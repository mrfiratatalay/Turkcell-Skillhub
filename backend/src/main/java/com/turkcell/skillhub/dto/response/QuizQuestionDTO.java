package com.turkcell.skillhub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizQuestionDTO {
    private String questionId;
    private String lessonId;
    private String questionText;
    private String correctAnswer;  // Don't send this to frontend initially
    private List<String> options;
}

