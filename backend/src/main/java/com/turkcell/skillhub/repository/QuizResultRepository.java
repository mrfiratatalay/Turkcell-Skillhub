package com.turkcell.skillhub.repository;

import com.turkcell.skillhub.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, String> {
    List<QuizResult> findByUser_UserIdOrderByCompletedAtDesc(String userId);
    
    @Query("SELECT COUNT(DISTINCT qr.lesson.lessonId) FROM QuizResult qr WHERE qr.user.userId = :userId")
    Long countCompletedLessonsByUserId(@Param("userId") String userId);
    
    @Query("SELECT COUNT(qr) FROM QuizResult qr WHERE qr.user.userId = :userId AND qr.score >= 80")
    Long countHighScoreQuizzesByUserId(@Param("userId") String userId);
    
    @Query("SELECT AVG(qr.score) FROM QuizResult qr WHERE qr.user.userId = :userId")
    Double getAverageScoreByUserId(@Param("userId") String userId);
}

