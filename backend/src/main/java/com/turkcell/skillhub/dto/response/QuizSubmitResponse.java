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
public class QuizSubmitResponse {
    private String resultId;
    private Integer score;
    private Integer correctAnswers;
    private Integer totalQuestions;
    private Integer pointsEarned;
    private List<BadgeDTO> newBadges;
    private String message;
}

