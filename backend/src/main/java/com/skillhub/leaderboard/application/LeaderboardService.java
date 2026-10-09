package com.skillhub.leaderboard.application;

import com.skillhub.leaderboard.application.LeaderboardQueries.CityTotal;
import com.skillhub.leaderboard.application.LeaderboardQueries.RankedLearner;
import com.skillhub.progress.domain.NightClock;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LeaderboardService {

    private final LeaderboardQueries queries;

    public LeaderboardService(LeaderboardQueries queries) {
        this.queries = queries;
    }

    public record Entry(int rank, UUID userId, String displayName, int cityId, String cityName, int xp,
                        int completedLessons, int level, String levelTitle, boolean me) {
    }

    public record LeaderboardView(List<Entry> entries, Entry me, Integer cityId) {
    }

    public record CityLightsView(List<CityTotal> cities, int totalLearners, int activeCities) {
    }

    @Transactional(readOnly = true)
    public LeaderboardView leaderboard(UUID userId, Integer cityId, int limit) {
        List<Entry> entries = queries.top(cityId, limit).stream().map(l -> entry(l, userId)).toList();
        Entry me = queries.learner(userId, cityId).map(l -> entry(l, userId)).orElse(null);
        if (me != null && cityId != null && me.cityId() != cityId) {
            me = null;
        }
        return new LeaderboardView(entries, me, cityId);
    }

    @Transactional(readOnly = true)
    public CityLightsView cityLights() {
        List<CityTotal> cities = queries.cityTotals();
        int learners = cities.stream().mapToInt(CityTotal::learners).sum();
        int active = (int) cities.stream().filter(c -> c.learners() > 0).count();
        return new CityLightsView(cities, learners, active);
    }

    /** Global rank of a learner, shown on the profile and the dashboard. */
    @Transactional(readOnly = true)
    public Integer globalRank(UUID userId) {
        return queries.learner(userId, null).map(RankedLearner::rank).orElse(null);
    }

    private static Entry entry(RankedLearner l, UUID me) {
        NightClock clock = NightClock.of(l.xp());
        return new Entry(l.rank(), l.userId(), l.displayName(), l.cityId(), l.cityName(), l.xp(),
                l.completedLessons(), clock.level(), clock.title(), l.userId().equals(me));
    }
}
