package com.turkcell.skillhub.service;

import com.turkcell.skillhub.dto.response.LessonDTO;
import com.turkcell.skillhub.entity.Lesson;
import com.turkcell.skillhub.exception.ResourceNotFoundException;
import com.turkcell.skillhub.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;

    @Transactional(readOnly = true)
    public List<LessonDTO> getAllLessons() {
        List<Lesson> lessons = lessonRepository.findAll();
        
        return lessons.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<LessonDTO> getLessonsByCategory(String categoryId) {
        List<Lesson> lessons = lessonRepository.findByCategory_CategoryId(categoryId);
        
        return lessons.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LessonDTO getLessonById(String lessonId) {
        Lesson lesson = lessonRepository.findByLessonId(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found: " + lessonId));
        
        return mapToDTO(lesson);
    }

    private LessonDTO mapToDTO(Lesson lesson) {
        return LessonDTO.builder()
                .lessonId(lesson.getLessonId())
                .categoryId(lesson.getCategory().getCategoryId())
                .title(lesson.getTitle())
                .durationMin(lesson.getDurationMin())
                .difficulty(lesson.getDifficulty() != null ? lesson.getDifficulty().getDisplayName() : "Beginner")
                .videoUrl(lesson.getVideoUrl())
                .description(lesson.getDescription())
                .build();
    }
}

