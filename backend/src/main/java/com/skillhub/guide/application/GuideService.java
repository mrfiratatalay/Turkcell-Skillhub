package com.skillhub.guide.application;

import com.skillhub.guide.domain.LearnerProfile;
import com.skillhub.guide.domain.Recommendation;
import com.skillhub.guide.domain.RecommendationEngine;
import com.skillhub.guide.domain.RuleBasedRecommendationEngine;
import com.skillhub.quiz.application.AttemptCompleted;
import com.skillhub.shared.error.DomainException;
import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

/** "Gece Rehberi": tries the LLM first, always falls back to the deterministic rule engine. */
@Service
public class GuideService {

    private static final Logger log = LoggerFactory.getLogger(GuideService.class);

    private final LearnerProfileFactory profiles;
    private final Optional<AiGuide> ai;
    private final RecommendationEngine rules = new RuleBasedRecommendationEngine();
    private final GuideProperties properties;
    private final Clock clock;
    private final Map<UUID, GuideView> cache = new ConcurrentHashMap<>();
    private final Map<UUID, Deque<Instant>> refreshes = new ConcurrentHashMap<>();

    public GuideService(LearnerProfileFactory profiles, Optional<AiGuide> ai, GuideProperties properties, Clock clock) {
        this.profiles = profiles;
        this.ai = ai;
        this.properties = properties;
        this.clock = clock;
    }

    public enum Source { AI, RULES }

    public record GuideView(Source source, String model, boolean aiConfigured, Instant generatedAt,
                            List<Recommendation> recommendations) {
    }

    public GuideView guide(UUID userId) {
        GuideView cached = cache.get(userId);
        if (cached != null && cached.generatedAt().plus(properties.cacheTtl()).isAfter(Instant.now(clock))) {
            return cached;
        }
        return generate(userId);
    }

    public GuideView refresh(UUID userId) {
        Instant now = Instant.now(clock);
        Deque<Instant> recent = refreshes.computeIfAbsent(userId, id -> new ArrayDeque<>());
        synchronized (recent) {
            while (!recent.isEmpty() && recent.peekFirst().isBefore(now.minus(Duration.ofHours(1)))) {
                recent.pollFirst();
            }
            if (recent.size() >= properties.refreshLimitPerHour()) {
                throw new DomainException.RateLimited(
                        "Rehberi bir saatte en fazla %d kez yenileyebilirsin.".formatted(properties.refreshLimitPerHour()));
            }
            recent.addLast(now);
        }
        return generate(userId);
    }

    /** A new attempt changes the learner's sky, so the cached advice is stale. */
    @EventListener
    void onAttemptCompleted(AttemptCompleted event) {
        cache.remove(event.userId());
    }

    private GuideView generate(UUID userId) {
        LearnerProfile profile = profiles.build(userId);
        GuideView view = ai.flatMap(engine -> askAi(engine, profile))
                .orElseGet(() -> new GuideView(Source.RULES, null, ai.isPresent(), Instant.now(clock),
                        rules.recommend(profile)));
        cache.put(userId, view);
        return view;
    }

    private Optional<GuideView> askAi(AiGuide engine, LearnerProfile profile) {
        try {
            return Optional.of(new GuideView(Source.AI, engine.modelName(), true, Instant.now(clock),
                    engine.recommend(profile)));
        } catch (RuntimeException ex) {
            log.warn("AI guide unavailable, falling back to rules: {}", ex.toString());
            return Optional.empty();
        }
    }
}
