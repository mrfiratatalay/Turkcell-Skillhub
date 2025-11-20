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
public class UserProgressResponse {
    private UserBasicInfo user;
    private Integer completedLessons;
    private Integer totalLessons;
    private Double completionRate;
    private Double averageScore;
    private List<QuizResultDTO> recentQuizResults;
    private List<BadgeDTO> badges;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserBasicInfo {
        private String userId;
        private String name;
        private String city;
        private String university;
        private String skillLevel;
        private Integer totalPoints;
        private Integer badgeCount;
    }
}

