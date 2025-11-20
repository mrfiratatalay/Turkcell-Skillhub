package com.turkcell.skillhub.repository;

import com.turkcell.skillhub.entity.Leaderboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaderboardRepository extends JpaRepository<Leaderboard, Long> {
    List<Leaderboard> findAllByOrderByRankAsc();
    List<Leaderboard> findByCityOrderByRankAsc(String city);
    void deleteByUserId(String userId);
}

