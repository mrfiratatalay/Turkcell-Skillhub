package com.turkcell.skillhub.repository;

import com.turkcell.skillhub.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, String> {
    List<Badge> findByUser_UserIdOrderByAwardedAtDesc(String userId);
    boolean existsByUser_UserIdAndName(String userId, String badgeName);
}

