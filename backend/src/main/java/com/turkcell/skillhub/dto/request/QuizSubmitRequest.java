package com.turkcell.skillhub.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizSubmitRequest {
    
    @NotBlank(message = "User ID is required")
    private String userId;
    
    @NotBlank(message = "Lesson ID is required")
    private String lessonId;
    
    @NotEmpty(message = "Answers list cannot be empty")
    private List<QuizAnswer> answers;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class QuizAnswer {
        @NotBlank(message = "Question ID is required")
        private String questionId;
        
        @NotBlank(message = "Answer is required")
        private String answer;
    }
}

