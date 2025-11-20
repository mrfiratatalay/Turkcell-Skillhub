package com.turkcell.skillhub.service;

import com.turkcell.skillhub.dto.response.BadgeDTO;
import com.turkcell.skillhub.dto.response.QuizResultDTO;
import com.turkcell.skillhub.dto.response.UserProgressResponse;
import com.turkcell.skillhub.entity.Badge;
import com.turkcell.skillhub.entity.QuizResult;
import com.turkcell.skillhub.entity.User;
import com.turkcell.skillhub.exception.ResourceNotFoundException;
import com.turkcell.skillhub.repository.BadgeRepository;
import com.turkcell.skillhub.repository.LessonRepository;
import com.turkcell.skillhub.repository.QuizResultRepository;
import com.turkcell.skillhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final QuizResultRepository quizResultRepository;
    private final BadgeRepository badgeRepository;
    private final LessonRepository lessonRepository;

    @Transactional(readOnly = true)
    public UserProgressResponse getUserProgress(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Completed lessons count (distinct lessons with at least one quiz result)
        Long completedLessons = quizResultRepository.countCompletedLessonsByUserId(userId);
        
        // Total lessons in system
        Long totalLessons = lessonRepository.count();
        
        // Completion rate
        double completionRate = totalLessons > 0 
                ? (completedLessons.doubleValue() / totalLessons.doubleValue()) * 100 
                : 0.0;
        
        // Average score
        Double averageScore = quizResultRepository.getAverageScoreByUserId(userId);
        if (averageScore == null) {
            averageScore = 0.0;
        }
        
        // Recent quiz results
        List<QuizResult> recentResults = quizResultRepository.findByUser_UserIdOrderByCompletedAtDesc(userId);
        List<QuizResultDTO> quizResultDTOs = recentResults.stream()
                .map(this::mapToQuizResultDTO)
                .collect(Collectors.toList());
        
        // Badges
        List<Badge> userBadges = badgeRepository.findByUser_UserIdOrderByAwardedAtDesc(userId);
        List<BadgeDTO> badgeDTOs = userBadges.stream()
                .map(this::mapToBadgeDTO)
                .collect(Collectors.toList());
        
        // Build response
        return UserProgressResponse.builder()
                .user(mapToUserBasicInfo(user))
                .completedLessons(completedLessons.intValue())
                .totalLessons(totalLessons.intValue())
                .completionRate(completionRate)
                .averageScore(averageScore)
                .recentQuizResults(quizResultDTOs)
                .badges(badgeDTOs)
                .build();
    }

    private UserProgressResponse.UserBasicInfo mapToUserBasicInfo(User user) {
        return UserProgressResponse.UserBasicInfo.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .city(user.getCity())
                .university(user.getUniversity())
                .skillLevel(user.getSkillLevel() != null ? user.getSkillLevel().getDisplayName() : "Beginner")
                .totalPoints(user.getTotalPoints())
                .badgeCount(user.getBadgeCount())
                .build();
    }

    private QuizResultDTO mapToQuizResultDTO(QuizResult result) {
        return QuizResultDTO.builder()
                .resultId(result.getResultId())
                .userId(result.getUser().getUserId())
                .lessonId(result.getLesson().getLessonId())
                .score(result.getScore())
                .completedAt(result.getCompletedAt().toString())
                .build();
    }

    private BadgeDTO mapToBadgeDTO(Badge badge) {
        return BadgeDTO.builder()
                .badgeId(badge.getBadgeId())
                .userId(badge.getUser().getUserId())
                .name(badge.getName())
                .awardedAt(badge.getAwardedAt().toString())
                .build();
    }
}

