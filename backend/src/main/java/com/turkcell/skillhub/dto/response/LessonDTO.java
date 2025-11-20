package com.turkcell.skillhub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LessonDTO {
    private String lessonId;
    private String categoryId;
    private String title;
    private Integer durationMin;
    private String difficulty;
    private String videoUrl;
    private String description;
}

