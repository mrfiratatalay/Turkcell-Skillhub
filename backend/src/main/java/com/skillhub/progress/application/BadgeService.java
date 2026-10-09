package com.skillhub.progress.application;

import com.skillhub.catalog.application.CatalogService;
import com.skillhub.progress.domain.BadgeDefinition;
import com.skillhub.progress.domain.ProgressRepository;
import com.skillhub.progress.domain.badge.BadgeContext;
import com.skillhub.progress.domain.badge.BadgeRule;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BadgeService {

    private final ProgressRepository repository;
    private final CatalogService catalog;
    private final List<BadgeRule> rules;

    public BadgeService(ProgressRepository repository, CatalogService catalog, List<BadgeRule> rules) {
        this.repository = repository;
        this.catalog = catalog;
        this.rules = rules;
    }

    public record BadgeView(String code, String name, String description, String hint, String icon, String tier,
                            boolean secret, boolean earned, Instant awardedAt) {
    }

    public record BadgeCollection(int earnedCount, int total, List<BadgeView> badges) {
    }

    /** Runs every strategy after an attempt and awards what was newly earned. */
    @Transactional
    public List<BadgeView> evaluate(UUID userId, BadgeContext.Trigger trigger) {
        Map<String, Instant> earned = repository.earnedBadges(userId);
        BadgeContext context = new BadgeContext(repository.stats(userId), catalog.catalog(), trigger);
        Map<String, BadgeDefinition> definitions = definitionsByCode();
        List<BadgeView> awarded = new ArrayList<>();
        for (BadgeRule rule : rules) {
            if (earned.containsKey(rule.code()) || !rule.isEarned(context)) {
                continue;
            }
            if (repository.awardBadge(userId, rule.code(), trigger.at())) {
                awarded.add(earnedView(definitions.get(rule.code()), trigger.at()));
            }
        }
        return awarded;
    }

    @Transactional(readOnly = true)
    public BadgeCollection collection(UUID userId) {
        Map<String, Instant> earned = repository.earnedBadges(userId);
        List<BadgeView> badges = repository.badgeDefinitions().stream()
                .map(d -> earned.containsKey(d.code()) ? earnedView(d, earned.get(d.code())) : lockedView(d))
                .toList();
        return new BadgeCollection(earned.size(), badges.size(), badges);
    }

    private Map<String, BadgeDefinition> definitionsByCode() {
        return repository.badgeDefinitions().stream()
                .collect(Collectors.toMap(BadgeDefinition::code, Function.identity()));
    }

    private static BadgeView earnedView(BadgeDefinition d, Instant awardedAt) {
        return new BadgeView(d.code(), d.name(), d.description(), d.hint(), d.icon(), d.tier(), d.secret(), true,
                awardedAt);
    }

    /** Secret badges keep their name and story hidden until they are earned. */
    private static BadgeView lockedView(BadgeDefinition d) {
        return d.secret()
                ? new BadgeView(d.code(), "Gizli Rozet", null, d.hint(), "secret", d.tier(), true, false, null)
                : new BadgeView(d.code(), d.name(), d.description(), d.hint(), d.icon(), d.tier(), false, false, null);
    }
}
