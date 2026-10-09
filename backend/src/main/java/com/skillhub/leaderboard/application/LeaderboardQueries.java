package com.skillhub.leaderboard.application;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Read-side port (CQRS-lite). Rankings are computed from the XP ledger on every read,
 * so there is no copied leaderboard table that could drift out of sync.
 */
public interface LeaderboardQueries {

    /** Ranked learners; with a city filter the rank is the rank inside that city. */
    List<RankedLearner> top(Integer cityId, int limit);

    Optional<RankedLearner> learner(UUID userId, Integer cityId);

    List<CityTotal> cityTotals();

    record RankedLearner(int rank, UUID userId, String displayName, int cityId, String cityName, int xp,
                         int completedLessons) {
    }

    record CityTotal(int cityId, String name, double latitude, double longitude, int learners, int xp, int rank) {
    }
}
