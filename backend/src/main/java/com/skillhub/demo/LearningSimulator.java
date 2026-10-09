package com.skillhub.demo;

import com.skillhub.catalog.application.CatalogService;
import com.skillhub.catalog.application.LearnerCatalog;
import com.skillhub.catalog.domain.Lesson;
import com.skillhub.catalog.domain.LessonStatus;
import com.skillhub.demo.DemoLearners.Persona;
import com.skillhub.quiz.application.QuizService;
import com.skillhub.quiz.domain.Answer;
import com.skillhub.quiz.domain.Question;
import com.skillhub.quiz.domain.QuizRepository;
import com.skillhub.shared.time.AppTime;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.TreeSet;
import java.util.UUID;
import org.springframework.stereotype.Component;

/**
 * Replays a believable learning history through the real QuizService, so XP, badges and streaks
 * are produced by the same rules as live traffic instead of being inserted by hand.
 */
@Component
class LearningSimulator {

    private static final int HISTORY_DAYS = 28;

    private final CatalogService catalog;
    private final QuizRepository quizzes;
    private final QuizService quizService;

    LearningSimulator(CatalogService catalog, QuizRepository quizzes, QuizService quizService) {
        this.catalog = catalog;
        this.quizzes = quizzes;
        this.quizService = quizService;
    }

    int simulate(UUID userId, Persona persona, Random random, Instant now) {
        int attempts = 0;
        LocalDate today = AppTime.localDate(now);
        for (int offset : sessionOffsets(persona, random)) {
            LocalDate day = today.minusDays(offset);
            Instant at = sessionStart(day, persona, random, now);
            boolean streakDay = offset < persona.streakTail();
            int perSession = 1 + random.nextInt(2);
            for (int i = 0; i < perSession; i++) {
                LearnerCatalog learner = catalog.forLearner(userId);
                boolean goalReached = learner.completedIds().size() >= persona.lessonGoal();
                // After the goal, learners on a live streak keep practising instead of disappearing.
                Lesson lesson = goalReached
                        ? (streakDay && i == 0 ? practiceLesson(learner) : null)
                        : pickLesson(learner, random);
                if (lesson == null) {
                    break;
                }
                boolean retry = learner.attempts(lesson.id()) > 0;
                double skill = Math.min(0.99, persona.skill() + (retry ? 0.12 : 0));
                quizService.submitAt(userId, lesson.slug(), answers(lesson, skill, random), at);
                attempts++;
                at = at.plusSeconds(600 + random.nextInt(900));
            }
        }
        return attempts;
    }

    /** Distinct day offsets (0 = today), oldest first; a live streak covers the most recent days. */
    private static List<Integer> sessionOffsets(Persona persona, Random random) {
        TreeSet<Integer> offsets = new TreeSet<>();
        for (int d = 0; d < persona.streakTail(); d++) {
            offsets.add(d);
        }
        while (offsets.size() < persona.activeDays()) {
            offsets.add(persona.streakTail() + 1 + random.nextInt(HISTORY_DAYS - persona.streakTail()));
        }
        return new ArrayList<>(offsets.descendingSet());
    }

    /** Most sessions start between 17:00 and 23:00, like Code Night; night owls sometimes code after midnight. */
    private static Instant sessionStart(LocalDate day, Persona persona, Random random, Instant now) {
        boolean afterMidnight = persona.nightOwl() && random.nextDouble() < 0.35;
        int hour = afterMidnight ? random.nextInt(4) : 17 + random.nextInt(6);
        Instant start = day.atTime(LocalTime.of(hour, random.nextInt(60))).atZone(AppTime.ZONE).toInstant();
        Instant latest = now.minusSeconds(3600);
        return start.isAfter(latest) ? latest.minusSeconds(random.nextInt(1800)) : start;
    }

    private static Lesson pickLesson(LearnerCatalog learner, Random random) {
        List<Lesson> open = learner.catalog().lessons().stream()
                .filter(l -> learner.statusOf(l.id()) == LessonStatus.AVAILABLE)
                .toList();
        List<Lesson> retries = open.stream().filter(l -> learner.attempts(l.id()) > 0).toList();
        if (!retries.isEmpty() && random.nextDouble() < 0.6) {
            return retries.get(random.nextInt(retries.size()));
        }
        List<Lesson> fresh = open.stream().filter(l -> learner.attempts(l.id()) == 0).toList();
        if (!fresh.isEmpty()) {
            return fresh.get(random.nextInt(fresh.size()));
        }
        return retries.isEmpty() ? null : retries.getFirst();
    }

    /** A completed lesson to polish: the one with the lowest best score. */
    private static Lesson practiceLesson(LearnerCatalog learner) {
        return learner.catalog().lessons().stream()
                .filter(learner::isCompleted)
                .min(java.util.Comparator.comparingInt(l -> learner.bestScore(l.id())))
                .orElse(null);
    }

    private List<Answer> answers(Lesson lesson, double skill, Random random) {
        List<Answer> answers = new ArrayList<>();
        for (Question question : quizzes.questionsFor(lesson.id())) {
            List<Question.Option> wrong = question.options().stream().filter(o -> !o.correct()).toList();
            int optionId = random.nextDouble() < skill
                    ? question.correctOptionId()
                    : wrong.get(random.nextInt(wrong.size())).id();
            answers.add(new Answer(question.id(), optionId));
        }
        return answers;
    }
}
