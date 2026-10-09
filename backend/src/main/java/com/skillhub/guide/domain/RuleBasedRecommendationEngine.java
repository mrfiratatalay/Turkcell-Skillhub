package com.skillhub.guide.domain;

import com.skillhub.guide.domain.LearnerProfile.CandidateLesson;
import com.skillhub.guide.domain.LearnerProfile.CategoryProgress;
import com.skillhub.guide.domain.LearnerProfile.RetryCandidate;
import com.skillhub.guide.domain.Recommendation.Kind;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

/**
 * Deterministic guide that always works, with or without an LLM. Every sentence is derived from real data.
 */
public final class RuleBasedRecommendationEngine implements RecommendationEngine {

    private static final int MAX_RECOMMENDATIONS = 3;

    @Override
    public List<Recommendation> recommend(LearnerProfile profile) {
        List<Recommendation> all = new ArrayList<>();
        nextStar(profile).ifPresent(all::add);
        profile.retry().stream().min(Comparator.comparingInt(RetryCandidate::bestScore)).ifPresent(r -> all.add(
                new Recommendation(Kind.RETRY, "Yarım kalan yıldızı yak",
                        "Son denemende %%%d aldın; geçmek için %%70 yeterli. Tekrar çöz, yıldız senin olsun."
                                .formatted(r.bestScore()), r.slug(), r.title(), 90)));
        almostDoneConstellation(profile).ifPresent(all::add);
        if (profile.streakDays() > 0 && !profile.activeToday()) {
            all.add(new Recommendation(Kind.STREAK, "Serini koru",
                    "%d günlük serin var. Bugün tek bir quiz çözmen alevi canlı tutar.".formatted(profile.streakDays()),
                    null, null, 85));
        }
        unexplored(profile).ifPresent(all::add);
        profile.polish().stream().min(Comparator.comparingInt(RetryCandidate::bestScore)).ifPresent(p -> all.add(
                new Recommendation(Kind.POLISH, "Kusursuzluğa bir adım",
                        "%s dersinde en iyi skorun %%%d. %%100 yaparsan kalan XP'yi de toplarsın."
                                .formatted(p.title(), p.bestScore()), p.slug(), p.title(), 60)));
        return all.stream()
                .sorted(Comparator.comparingInt(Recommendation::priority).reversed())
                .limit(MAX_RECOMMENDATIONS)
                .toList();
    }

    private static Optional<Recommendation> nextStar(LearnerProfile profile) {
        return profile.available().stream()
                .max(Comparator.comparingInt(CandidateLesson::unlocks)
                        .thenComparing(c -> -difficultyRank(c.difficulty())))
                .map(c -> new Recommendation(Kind.NEXT_STAR, "Sıradaki yıldızın",
                        c.unlocks() > 0
                                ? "%s yıldızını yaktığında gökyüzünde %d yeni yıldızın kilidi açılır."
                                        .formatted(c.title(), c.unlocks())
                                : "%s seni bekliyor; tamamlarsan %d XP kazanırsın.".formatted(c.title(), c.xpReward()),
                        c.slug(), c.title(), 100));
    }

    private static Optional<Recommendation> almostDoneConstellation(LearnerProfile profile) {
        return profile.categories().stream()
                .filter(c -> c.completed() > 0 && c.completed() < c.total())
                .min(Comparator.comparingInt(c -> c.total() - c.completed()))
                .flatMap(category -> firstAvailableIn(profile, category).map(lesson ->
                        new Recommendation(Kind.CONSTELLATION, category.constellation() + " takımyıldızını tamamla",
                                "%s takımyıldızında %d yıldız kaldı. Hepsini yakınca özel rozetini alırsın."
                                        .formatted(category.name(), category.total() - category.completed()),
                                lesson.slug(), lesson.title(), 80)));
    }

    private static Optional<Recommendation> unexplored(LearnerProfile profile) {
        return profile.categories().stream()
                .filter(c -> c.completed() == 0)
                .findFirst()
                .flatMap(category -> firstAvailableIn(profile, category).map(lesson ->
                        new Recommendation(Kind.EXPLORE, "Yeni bir takımyıldız keşfet",
                                "%s alanına henüz dokunmadın. Farklı beceriler CV'ni güçlendirir."
                                        .formatted(category.name()),
                                lesson.slug(), lesson.title(), 70)));
    }

    private static Optional<CandidateLesson> firstAvailableIn(LearnerProfile profile, CategoryProgress category) {
        return profile.available().stream().filter(l -> l.categorySlug().equals(category.slug())).findFirst();
    }

    private static int difficultyRank(String difficulty) {
        return switch (difficulty) {
            case "BEGINNER" -> 0;
            case "INTERMEDIATE" -> 1;
            default -> 2;
        };
    }
}
