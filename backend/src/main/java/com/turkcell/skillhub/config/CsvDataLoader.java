package com.turkcell.skillhub.config;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import com.turkcell.skillhub.entity.*;
import com.turkcell.skillhub.entity.enums.Difficulty;
import com.turkcell.skillhub.entity.enums.SkillLevel;
import com.turkcell.skillhub.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class CsvDataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizResultRepository quizResultRepository;
    private final BadgeRepository badgeRepository;
    private final LeaderboardRepository leaderboardRepository;

    private Map<String, Category> categoryMap = new HashMap<>();
    private Map<String, Lesson> lessonMap = new HashMap<>();
    private Map<String, User> userMap = new HashMap<>();

    @Override
    public void run(String... args) throws Exception {
        log.info("Starting CSV data loading...");
        
        loadCategories();
        loadLessons();
        loadUsers();
        loadQuizQuestions();
        loadQuizResults();
        loadBadges();
        loadLeaderboard();
        
        log.info("CSV data loading completed successfully!");
    }

    @SuppressWarnings("null")
    private void loadCategories() throws IOException, CsvException {
        log.info("Loading categories...");
        List<String[]> rows = readCsv("turkcell_skillhub_seed_data/categories.csv");
        
        for (int i = 1; i < rows.size(); i++) { // Skip header
            String[] row = rows.get(i);
            
            Category category = Category.builder()
                    .categoryId(row[0])
                    .name(row[1])
                    .description(row[2])
                    .build();
            
            categoryRepository.save(category);
            categoryMap.put(category.getCategoryId(), category);
        }
        
        log.info("Loaded {} categories", categoryMap.size());
    }

    @SuppressWarnings("null")
    private void loadLessons() throws IOException, CsvException {
        log.info("Loading lessons...");
        List<String[]> rows = readCsv("turkcell_skillhub_seed_data/lessons.csv");
        
        for (int i = 1; i < rows.size(); i++) {
            String[] row = rows.get(i);
            
            Lesson lesson = Lesson.builder()
                    .lessonId(row[0])
                    .category(categoryMap.get(row[1]))
                    .title(row[2])
                    .durationMin(Integer.parseInt(row[3]))
                    .difficulty(Difficulty.fromString(row[4]))
                    .videoUrl(row.length > 5 ? row[5] : null)
                    .description(row.length > 6 ? row[6] : null)
                    .build();
            
            lessonRepository.save(lesson);
            lessonMap.put(lesson.getLessonId(), lesson);
        }
        
        log.info("Loaded {} lessons", lessonMap.size());
    }

    @SuppressWarnings("null")
    private void loadUsers() throws IOException, CsvException {
        log.info("Loading users...");
        List<String[]> rows = readCsv("turkcell_skillhub_seed_data/users.csv");
        
        for (int i = 1; i < rows.size(); i++) {
            String[] row = rows.get(i);
            
            User user = User.builder()
                    .userId(row[0])
                    .name(row[1])
                    .city(row[2])
                    .university(row[3])
                    .skillLevel(SkillLevel.fromString(row[4]))
                    .totalPoints(Integer.parseInt(row[5]))
                    .badgeCount(Integer.parseInt(row[6]))
                    .build();
            
            userRepository.save(user);
            userMap.put(user.getUserId(), user);
        }
        
        log.info("Loaded {} users", userMap.size());
    }

    @SuppressWarnings("null")
    private void loadQuizQuestions() throws IOException, CsvException {
        log.info("Loading quiz questions...");
        List<String[]> rows = readCsv("turkcell_skillhub_seed_data/quizzes.csv");
        
        int count = 0;
        for (int i = 1; i < rows.size(); i++) {
            String[] row = rows.get(i);
            
            QuizQuestion question = QuizQuestion.builder()
                    .questionId(row[0])
                    .lesson(lessonMap.get(row[1]))
                    .questionText(row[2])
                    .correctAnswer(row[3])
                    .options(row[4]) // Pipe-separated options
                    .build();
            
            quizQuestionRepository.save(question);
            count++;
        }
        
        log.info("Loaded {} quiz questions", count);
    }

    @SuppressWarnings("null")
    private void loadQuizResults() throws IOException, CsvException {
        log.info("Loading quiz results...");
        List<String[]> rows = readCsv("turkcell_skillhub_seed_data/quiz_results.csv");
        
        int count = 0;
        for (int i = 1; i < rows.size(); i++) {
            String[] row = rows.get(i);
            
            // Parse ISO 8601 format (2025-11-09T10:00:00Z)
            LocalDateTime completedAt = java.time.Instant.parse(row[4])
                    .atZone(java.time.ZoneId.systemDefault())
                    .toLocalDateTime();
            
            QuizResult result = QuizResult.builder()
                    .resultId(row[0])
                    .user(userMap.get(row[1]))
                    .lesson(lessonMap.get(row[2]))
                    .score(Integer.parseInt(row[3]))
                    .completedAt(completedAt)
                    .build();
            
            quizResultRepository.save(result);
            count++;
        }
        
        log.info("Loaded {} quiz results", count);
    }

    @SuppressWarnings("null")
    private void loadBadges() throws IOException, CsvException {
        log.info("Loading badges...");
        List<String[]> rows = readCsv("turkcell_skillhub_seed_data/badges.csv");
        
        int count = 0;
        for (int i = 1; i < rows.size(); i++) {
            String[] row = rows.get(i);
            
            // Parse ISO 8601 format (2025-11-09T12:00:00Z)
            LocalDateTime awardedAt = java.time.Instant.parse(row[3])
                    .atZone(java.time.ZoneId.systemDefault())
                    .toLocalDateTime();
            
            Badge badge = Badge.builder()
                    .badgeId(row[0])
                    .user(userMap.get(row[1]))
                    .name(row[2])
                    .awardedAt(awardedAt)
                    .build();
            
            badgeRepository.save(badge);
            count++;
        }
        
        log.info("Loaded {} badges", count);
    }

    @SuppressWarnings("null")
    private void loadLeaderboard() throws IOException, CsvException {
        log.info("Loading leaderboard...");
        List<String[]> rows = readCsv("turkcell_skillhub_seed_data/leaderboard.csv");
        
        int count = 0;
        for (int i = 1; i < rows.size(); i++) {
            String[] row = rows.get(i);
            
            Leaderboard entry = Leaderboard.builder()
                    .userId(row[0])
                    .rank(Integer.parseInt(row[1]))
                    .totalPoints(Integer.parseInt(row[2]))
                    .city(row[3])
                    .name(row.length > 4 ? row[4] : null)
                    .build();
            
            leaderboardRepository.save(entry);
            count++;
        }
        
        log.info("Loaded {} leaderboard entries", count);
    }

    @SuppressWarnings("null")
    private List<String[]> readCsv(String path) throws IOException, CsvException {
        // First try to load from file system (for turkcell_skillhub_seed_data)
        java.io.File file = new java.io.File(path);
        if (file.exists()) {
            try (CSVReader reader = new CSVReader(new java.io.FileReader(file))) {
                return reader.readAll();
            }
        }
        
        // Fallback to classpath resource
        ClassPathResource resource = new ClassPathResource(path);
        try (CSVReader reader = new CSVReader(new InputStreamReader(resource.getInputStream()))) {
            return reader.readAll();
        }
    }
}

