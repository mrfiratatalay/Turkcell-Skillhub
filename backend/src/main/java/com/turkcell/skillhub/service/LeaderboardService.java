package com.turkcell.skillhub.service;

import com.turkcell.skillhub.dto.response.LeaderboardEntryDTO;
import com.turkcell.skillhub.entity.Leaderboard;
import com.turkcell.skillhub.repository.LeaderboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final LeaderboardRepository leaderboardRepository;

    @Transactional(readOnly = true)
    public List<LeaderboardEntryDTO> getLeaderboard(String city) {
        List<Leaderboard> entries;
        
        if (city != null && !city.isEmpty()) {
            entries = leaderboardRepository.findByCityOrderByRankAsc(city);
        } else {
            entries = leaderboardRepository.findAllByOrderByRankAsc();
        }
        
        return entries.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private LeaderboardEntryDTO mapToDTO(Leaderboard entry) {
        return LeaderboardEntryDTO.builder()
                .userId(entry.getUserId())
                .rank(entry.getRank())
                .name(entry.getName())
                .totalPoints(entry.getTotalPoints())
                .city(entry.getCity())
                .build();
    }
}

