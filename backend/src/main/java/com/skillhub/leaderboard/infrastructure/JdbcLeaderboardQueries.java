package com.skillhub.leaderboard.infrastructure;

import com.skillhub.leaderboard.application.LeaderboardQueries;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@Repository
class JdbcLeaderboardQueries implements LeaderboardQueries {

    /** Totals per learner straight from the ledger, ranked globally and inside each city. */
    private static final String RANKED = """
            WITH totals AS (
                SELECT u.id, u.display_name, u.city_id, c.name AS city_name,
                       coalesce((SELECT sum(x.amount) FROM xp_events x WHERE x.user_id = u.id), 0) AS xp,
                       (SELECT count(DISTINCT a.lesson_id) FROM quiz_attempts a
                         WHERE a.user_id = u.id AND a.passed) AS completed
                FROM users u JOIN cities c ON c.id = u.city_id
            )
            SELECT id, display_name, city_id, city_name, xp, completed,
                   RANK() OVER (ORDER BY xp DESC) AS global_rank,
                   RANK() OVER (PARTITION BY city_id ORDER BY xp DESC) AS city_rank
            FROM totals
            """;

    private final JdbcClient jdbc;

    JdbcLeaderboardQueries(JdbcClient jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public List<RankedLearner> top(Integer cityId, int limit) {
        String sql = "SELECT * FROM (" + RANKED + ") r "
                + (cityId == null ? "" : "WHERE r.city_id = :cityId ")
                + "ORDER BY r.xp DESC, r.completed DESC, r.display_name LIMIT :limit";
        var spec = jdbc.sql(sql).param("limit", limit);
        if (cityId != null) {
            spec = spec.param("cityId", cityId);
        }
        return spec.query(mapper(cityId != null)).list();
    }

    @Override
    public Optional<RankedLearner> learner(UUID userId, Integer cityId) {
        return jdbc.sql("SELECT * FROM (" + RANKED + ") r WHERE r.id = :userId")
                .param("userId", userId)
                .query(mapper(cityId != null))
                .optional();
    }

    @Override
    public List<CityTotal> cityTotals() {
        return jdbc.sql("""
                        SELECT c.id AS city_id, c.name, c.latitude, c.longitude,
                               count(DISTINCT u.id) AS learners,
                               coalesce(sum(x.amount), 0) AS xp,
                               RANK() OVER (ORDER BY coalesce(sum(x.amount), 0) DESC) AS rank
                        FROM cities c
                        LEFT JOIN users u ON u.city_id = c.id
                        LEFT JOIN xp_events x ON x.user_id = u.id
                        GROUP BY c.id
                        ORDER BY xp DESC, c.name""")
                .query(CityTotal.class).list();
    }

    private static RowMapper<RankedLearner> mapper(boolean cityRank) {
        return (rs, row) -> new RankedLearner(rs.getInt(cityRank ? "city_rank" : "global_rank"),
                rs.getObject("id", UUID.class), rs.getString("display_name"), rs.getInt("city_id"),
                rs.getString("city_name"), rs.getInt("xp"), rs.getInt("completed"));
    }
}
