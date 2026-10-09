package com.skillhub.quiz.infrastructure;

import com.skillhub.quiz.domain.GradedQuiz;
import com.skillhub.quiz.domain.Question;
import com.skillhub.quiz.domain.QuizRepository;
import com.skillhub.shared.time.AppTime;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
class JdbcQuizRepository implements QuizRepository {

    private final JdbcClient jdbc;

    JdbcQuizRepository(JdbcClient jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public List<Question> questionsFor(int lessonId) {
        Map<Integer, QuestionRow> rows = new LinkedHashMap<>();
        jdbc.sql("""
                        SELECT q.id, q.position, q.prompt, q.explanation,
                               o.id AS option_id, o.position AS option_position, o.label, o.is_correct
                        FROM questions q JOIN question_options o ON o.question_id = q.id
                        WHERE q.lesson_id = :lessonId
                        ORDER BY q.position, o.position""")
                .param("lessonId", lessonId)
                .query(rs -> {
                    int id = rs.getInt("id");
                    QuestionRow row = rows.get(id);
                    if (row == null) {
                        row = new QuestionRow(id, rs.getInt("position"), rs.getString("prompt"),
                                rs.getString("explanation"), new ArrayList<>());
                        rows.put(id, row);
                    }
                    row.options().add(new Question.Option(rs.getInt("option_id"), rs.getInt("option_position"),
                            rs.getString("label"), rs.getBoolean("is_correct")));
                });
        return rows.values().stream()
                .map(r -> new Question(r.id(), lessonId, r.position(), r.prompt(), r.explanation(), List.copyOf(r.options())))
                .toList();
    }

    @Override
    public UUID saveAttempt(UUID userId, int lessonId, GradedQuiz graded, Instant completedAt) {
        UUID attemptId = jdbc.sql("""
                        INSERT INTO quiz_attempts (user_id, lesson_id, score, correct_count, question_count, passed, completed_at)
                        VALUES (:userId, :lessonId, :score, :correct, :total, :passed, :at)
                        RETURNING id""")
                .param("userId", userId).param("lessonId", lessonId).param("score", graded.score())
                .param("correct", graded.correctCount()).param("total", graded.questionCount())
                .param("passed", graded.passed()).param("at", AppTime.toDb(completedAt))
                .query(UUID.class).single();
        for (GradedQuiz.GradedAnswer answer : graded.answers()) {
            jdbc.sql("""
                            INSERT INTO attempt_answers (attempt_id, question_id, option_id, is_correct)
                            VALUES (:attemptId, :questionId, :optionId, :correct)""")
                    .param("attemptId", attemptId).param("questionId", answer.questionId())
                    .param("optionId", answer.selectedOptionId()).param("correct", answer.correct())
                    .update();
        }
        return attemptId;
    }

    @Override
    public List<AttemptRecord> recentAttempts(UUID userId, int limit) {
        return jdbc.sql("""
                        SELECT a.id, l.slug, l.title, c.slug AS category_slug, a.score, a.passed, a.completed_at,
                               coalesce((SELECT sum(x.amount) FROM xp_events x WHERE x.attempt_id = a.id), 0) AS xp
                        FROM quiz_attempts a
                        JOIN lessons l ON l.id = a.lesson_id
                        JOIN categories c ON c.id = l.category_id
                        WHERE a.user_id = :userId
                        ORDER BY a.completed_at DESC
                        LIMIT :limit""")
                .param("userId", userId).param("limit", limit)
                .query((rs, n) -> new AttemptRecord(rs.getObject("id", UUID.class), rs.getString("slug"),
                        rs.getString("title"), rs.getString("category_slug"), rs.getInt("score"),
                        rs.getBoolean("passed"), rs.getInt("xp"),
                        rs.getObject("completed_at", OffsetDateTime.class).toInstant()))
                .list();
    }

    private record QuestionRow(int id, int position, String prompt, String explanation, List<Question.Option> options) {
    }
}
