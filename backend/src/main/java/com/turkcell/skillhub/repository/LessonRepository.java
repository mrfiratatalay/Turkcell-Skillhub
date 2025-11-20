package com.turkcell.skillhub.repository;

import com.turkcell.skillhub.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, String> {
    Optional<Lesson> findByLessonId(String lessonId);
    List<Lesson> findByCategory_CategoryId(String categoryId);
}

