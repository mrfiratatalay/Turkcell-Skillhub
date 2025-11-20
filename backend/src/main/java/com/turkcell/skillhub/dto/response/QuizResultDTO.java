package com.turkcell.skillhub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizResultDTO {
    private String resultId;
    private String userId;
    private String lessonId;
    private Integer score;
    private String completedAt;
}

