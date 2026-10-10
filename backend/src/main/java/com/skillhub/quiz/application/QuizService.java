package com.skillhub.quiz.application;

import com.skillhub.catalog.application.CatalogService;
import com.skillhub.catalog.application.CatalogViews.LessonRef;
import com.skillhub.catalog.application.LearnerCatalog;
import com.skillhub.catalog.domain.Lesson;
import com.skillhub.catalog.domain.LessonStatus;
import com.skillhub.catalog.domain.LessonStatusPolicy;
import com.skillhub.progress.application.BadgeService;
import com.skillhub.progress.application.BadgeService.BadgeView;
import com.skillhub.progress.application.ProgressService;
import com.skillhub.progress.domain.NightClock;
import com.skillhub.progress.domain.XpPolicy;
import com.skillhub.progress.domain.badge.BadgeContext;
import com.skillhub.quiz.application.QuizViews.AttemptResult;
import com.skillhub.quiz.application.QuizViews.OptionView;
import com.skillhub.quiz.application.QuizViews.QuestionView;
import com.skillhub.quiz.application.QuizViews.QuizView;
import com.skillhub.quiz.application.QuizViews.ReviewItem;
import com.skillhub.quiz.domain.Answer;
import com.skillhub.quiz.domain.GradedQuiz;
import com.skillhub.quiz.domain.Question;
import com.skillhub.quiz.domain.QuizGrader;
import com.skillhub.quiz.domain.QuizRepository;
import java.time.Clock;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuizService {

    private final CatalogService catalog;
    private final QuizRepository quizzes;
    private final ProgressService progress;
    private final BadgeService badges;
    private final ApplicationEventPublisher events;
    private final Clock clock;

    public QuizService(CatalogService catalog, QuizRepository quizzes, ProgressService progress, BadgeService badges,
                       ApplicationEventPublisher events, Clock clock) {
        this.catalog = catalog;
        this.quizzes = quizzes;
        this.progress = progress;
        this.badges = badges;
        this.events = events;
        this.clock = clock;
    }

    @Transactional(readOnly = true)
    public QuizView quiz(UUID userId, String slug) {
        Lesson lesson = catalog.requireUnlocked(userId, slug);
        List<QuestionView> questions = quizzes.questionsFor(lesson.id()).stream()
                .map(q -> new QuestionView(q.id(), q.position(), q.prompt(), options(q)))
                .toList();
        return new QuizView(lesson.slug(), lesson.title(), LessonStatusPolicy.PASSING_SCORE, lesson.xpReward(),
                catalog.forLearner(userId).bestScore(lesson.id()), questions);
    }

    /**
     * Transactional here as well: {@link #submitAt} is called on {@code this}, which bypasses Spring's proxy,
     * so its own annotation would not open a transaction for web requests.
     */
    @Transactional
    public AttemptResult submit(UUID userId, String slug, List<Answer> answers) {
        return submitAt(userId, slug, answers, Instant.now(clock));
    }

    /** Grades, stores and rewards one attempt atomically. {@code at} is explicit so demo data can replay history. */
    @Transactional
    public AttemptResult submitAt(UUID userId, String slug, List<Answer> answers, Instant at) {
        // A double-click must not pay the same improvement twice: the learner's attempts run one at a time,
        // and every read below already sees the previous attempt's committed score and XP.
        quizzes.lockLearner(userId);
        Lesson lesson = catalog.requireUnlocked(userId, slug);
        LearnerCatalog before = catalog.forLearner(userId);
        List<Question> questions = quizzes.questionsFor(lesson.id());
        GradedQuiz graded = QuizGrader.grade(questions, answers);
        Integer previousBest = before.bestScore(lesson.id());
        boolean failedBefore = before.attempts(lesson.id()) > 0 && !before.isCompleted(lesson);
        int xpBefore = progress.stats(userId).totalXp();

        UUID attemptId = quizzes.saveAttempt(userId, lesson.id(), graded, at);
        int xpEarned = XpPolicy.earned(lesson.xpReward(), previousBest, graded.score());
        progress.recordXp(userId, xpEarned, lesson.id(), attemptId, at);
        List<BadgeView> newBadges = badges.evaluate(userId,
                new BadgeContext.Trigger(at, graded.score(), graded.passed(), failedBefore));
        LearnerCatalog after = catalog.forLearner(userId);
        events.publishEvent(new AttemptCompleted(userId, lesson.id()));

        NightClock clockBefore = NightClock.of(xpBefore);
        NightClock clockAfter = NightClock.of(xpBefore + xpEarned);
        return new AttemptResult(attemptId, lesson.slug(), lesson.title(), graded.score(), graded.correctCount(),
                graded.questionCount(), graded.passed(), LessonStatusPolicy.PASSING_SCORE, previousBest, xpEarned,
                xpBefore + xpEarned, clockBefore, clockAfter, clockAfter.level() > clockBefore.level(), newBadges,
                newlyUnlocked(before, after), review(questions, graded));
    }

    @Transactional(readOnly = true)
    public List<QuizRepository.AttemptRecord> history(UUID userId, int limit) {
        return quizzes.recentAttempts(userId, limit);
    }

    private static List<LessonRef> newlyUnlocked(LearnerCatalog before, LearnerCatalog after) {
        return after.catalog().lessons().stream()
                .filter(l -> before.statusOf(l.id()) == LessonStatus.LOCKED
                        && after.statusOf(l.id()) == LessonStatus.AVAILABLE)
                .map(l -> new LessonRef(l.slug(), l.title(), LessonStatus.AVAILABLE))
                .toList();
    }

    private static List<ReviewItem> review(List<Question> questions, GradedQuiz graded) {
        return questions.stream().map(q -> {
            GradedQuiz.GradedAnswer answer = graded.answers().stream()
                    .filter(a -> a.questionId() == q.id()).findFirst().orElseThrow();
            return new ReviewItem(q.id(), q.prompt(), options(q), answer.selectedOptionId(), answer.correctOptionId(),
                    answer.correct(), q.explanation());
        }).toList();
    }

    private static List<OptionView> options(Question question) {
        return question.options().stream().map(o -> new OptionView(o.id(), o.label())).toList();
    }
}
