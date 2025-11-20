package com.turkcell.skillhub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "leaderboard")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Leaderboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, length = 50)
    private String userId;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "total_points")
    private Integer totalPoints;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "name", length = 100)
    private String name;
}

