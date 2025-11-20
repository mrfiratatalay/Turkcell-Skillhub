package com.turkcell.skillhub.controller;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
@CrossOrigin
@Hidden // Hide from Swagger UI
public class WelcomeController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> welcome() {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "SkillHub Backend API");
        response.put("version", "1.0.0");
        response.put("status", "running");
        response.put("swagger", "/api/swagger-ui/index.html");
        response.put("endpoints", Map.of(
            "users", "/api/users/{userId}/progress",
            "leaderboard", "/api/leaderboard",
            "quiz", "/api/quiz/lesson/{lessonId}",
            "quizSubmit", "/api/quiz/submit"
        ));
        
        return ResponseEntity.ok(response);
    }
}

