package com.turkcell.skillhub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaderboardEntryDTO {
    private String userId;
    private Integer rank;
    private String name;
    private Integer totalPoints;
    private String city;
}

