package com.turkcell.skillhub.service;

import com.turkcell.skillhub.dto.request.QuizSubmitRequest;
import com.turkcell.skillhub.dto.response.BadgeDTO;
import com.turkcell.skillhub.dto.response.QuizQuestionDTO;
import com.turkcell.skillhub.dto.response.QuizSubmitResponse;
import com.turkcell.skillhub.entity.*;
import com.turkcell.skillhub.exception.ResourceNotFoundException;
import com.turkcell.skillhub.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuizService {

    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizResultRepository quizResultRepository;
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;
    private final BadgeService badgeService;

    @Transactional(readOnly = true)
    public List<QuizQuestionDTO> getQuizByLesson(String lessonId) {
        List<QuizQuestion> questions = quizQuestionRepository.findByLesson_LessonId(lessonId);
        
        if (questions.isEmpty()) {
            throw new ResourceNotFoundException("No quiz found for lesson: " + lessonId);
        }
        
        return questions.stream()
                .map(this::mapToQuizQuestionDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    @SuppressWarnings("null")
    public QuizSubmitResponse submitQuiz(QuizSubmitRequest request) {
        // Validate user and lesson
        User user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + request.getUserId()));
        
        Lesson lesson = lessonRepository.findByLessonId(request.getLessonId())
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found: " + request.getLessonId()));
        
        // Get all questions for this lesson
        List<QuizQuestion> questions = quizQuestionRepository.findByLesson_LessonId(request.getLessonId());
        
        if (questions.isEmpty()) {
            throw new ResourceNotFoundException("No questions found for lesson: " + request.getLessonId());
        }
        
        // Evaluate answers
        int correctAnswers = 0;
        int totalQuestions = questions.size();
        
        for (QuizSubmitRequest.QuizAnswer answer : request.getAnswers()) {
            QuizQuestion question = questions.stream()
                    .filter(q -> q.getQuestionId().equals(answer.getQuestionId()))
                    .findFirst()
                    .orElse(null);
            
            if (question != null && question.getCorrectAnswer().trim().equalsIgnoreCase(answer.getAnswer().trim())) {
                correctAnswers++;
            }
        }
        
        // Calculate score (percentage)
        int score = totalQuestions > 0 ? (correctAnswers * 100) / totalQuestions : 0;
        
        // Calculate points earned (same as score for simplicity)
        int pointsEarned = score;
        
        // Save quiz result
        QuizResult quizResult = QuizResult.builder()
                .resultId(UUID.randomUUID().toString())
                .user(user)
                .lesson(lesson)
                .score(score)
                .completedAt(LocalDateTime.now())
                .build();
        
        quizResultRepository.save(quizResult);
        
        // Update user points
        user.setTotalPoints(user.getTotalPoints() + pointsEarned);
        userRepository.save(user);
        
        // Evaluate and award badges
        List<BadgeDTO> newBadges = badgeService.evaluateAndAwardBadges(user.getUserId());
        
        // Update user badge count
        user.setBadgeCount(user.getBadges().size());
        userRepository.save(user);
        
        // Build response
        String message = buildSuccessMessage(score, newBadges);
        
        return QuizSubmitResponse.builder()
                .resultId(quizResult.getResultId())
                .score(score)
                .correctAnswers(correctAnswers)
                .totalQuestions(totalQuestions)
                .pointsEarned(pointsEarned)
                .newBadges(newBadges)
                .message(message)
                .build();
    }

    private String buildSuccessMessage(int score, List<BadgeDTO> newBadges) {
        StringBuilder message = new StringBuilder();
        
        if (score >= 80) {
            message.append("Harika! Mükemmel bir performans sergileddin. ");
        } else if (score >= 60) {
            message.append("Güzel iş! Devam et! ");
        } else {
            message.append("İyi bir deneme! Tekrar deneyebilirsin. ");
        }
        
        if (!newBadges.isEmpty()) {
            message.append("Yeni rozet(ler) kazandın: ");
            String badgeNames = newBadges.stream()
                    .map(BadgeDTO::getName)
                    .collect(Collectors.joining(", "));
            message.append(badgeNames);
        }
        
        return message.toString();
    }

    private QuizQuestionDTO mapToQuizQuestionDTO(QuizQuestion question) {
        List<String> options = parseOptions(question.getOptions());
        
        return QuizQuestionDTO.builder()
                .questionId(question.getQuestionId())
                .lessonId(question.getLesson().getLessonId())
                .questionText(question.getQuestionText())
                .correctAnswer(null) // Don't send correct answer to client initially
                .options(options)
                .build();
    }

    private List<String> parseOptions(String optionsStr) {
        if (optionsStr == null || optionsStr.isEmpty()) {
            return new ArrayList<>();
        }
        // Assuming options are pipe-separated: "Option1|Option2|Option3"
        return Arrays.asList(optionsStr.split("\\|"));
    }
}

