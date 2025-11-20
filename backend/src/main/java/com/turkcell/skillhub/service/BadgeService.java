package com.turkcell.skillhub.service;

import com.turkcell.skillhub.dto.response.BadgeDTO;
import com.turkcell.skillhub.entity.Badge;
import com.turkcell.skillhub.entity.User;
import com.turkcell.skillhub.exception.ResourceNotFoundException;
import com.turkcell.skillhub.repository.BadgeRepository;
import com.turkcell.skillhub.repository.QuizResultRepository;
import com.turkcell.skillhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class BadgeService {

    private final BadgeRepository badgeRepository;
    private final QuizResultRepository quizResultRepository;
    private final UserRepository userRepository;

    // Badge names as constants
    private static final String MOTIVATION_BADGE = "Motivasyon Rozeti";
    private static final String EXPERT_BADGE = "Uzman Rozeti";

    @Transactional
    @SuppressWarnings("null")
    public List<BadgeDTO> evaluateAndAwardBadges(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        List<BadgeDTO> newBadges = new ArrayList<>();

        // Check for Motivation Badge (3+ completed lessons)
        Long completedLessons = quizResultRepository.countCompletedLessonsByUserId(userId);
        if (completedLessons >= 3) {
            if (!badgeRepository.existsByUser_UserIdAndName(userId, MOTIVATION_BADGE)) {
                Badge badge = createBadge(user, MOTIVATION_BADGE);
                badgeRepository.save(badge);
                newBadges.add(mapToBadgeDTO(badge));
                log.info("Awarded Motivation Badge to user: {}", userId);
            }
        }

        // Check for Expert Badge (10+ quizzes with score >= 80)
        Long highScoreQuizzes = quizResultRepository.countHighScoreQuizzesByUserId(userId);
        if (highScoreQuizzes >= 10) {
            if (!badgeRepository.existsByUser_UserIdAndName(userId, EXPERT_BADGE)) {
                Badge badge = createBadge(user, EXPERT_BADGE);
                badgeRepository.save(badge);
                newBadges.add(mapToBadgeDTO(badge));
                log.info("Awarded Expert Badge to user: {}", userId);
            }
        }

        return newBadges;
    }

    @Transactional(readOnly = true)
    public List<BadgeDTO> getUserBadges(String userId) {
        List<Badge> badges = badgeRepository.findByUser_UserIdOrderByAwardedAtDesc(userId);
        
        List<BadgeDTO> badgeDTOs = new ArrayList<>();
        for (Badge badge : badges) {
            badgeDTOs.add(mapToBadgeDTO(badge));
        }
        
        return badgeDTOs;
    }

    private Badge createBadge(User user, String badgeName) {
        return Badge.builder()
                .badgeId(UUID.randomUUID().toString())
                .user(user)
                .name(badgeName)
                .awardedAt(LocalDateTime.now())
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

