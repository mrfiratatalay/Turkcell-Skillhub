package com.skillhub.progress.infrastructure;

import com.skillhub.progress.domain.badge.AchievementRules;
import com.skillhub.progress.domain.badge.BadgeRule;
import com.skillhub.progress.domain.badge.ExplorationRules;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/** The one place that lists active badge strategies; the badge service just iterates over them. */
@Configuration
class BadgeRulesConfig {

    @Bean
    List<BadgeRule> badgeRules() {
        return List.of(
                new AchievementRules.FirstStar(),
                new AchievementRules.PerfectScore(),
                new AchievementRules.DailyStreak("ALEV_SERISI", 3),
                new AchievementRules.DailyStreak("KESINTISIZ_HAFTA", 7),
                new ExplorationRules.Explorer(3),
                new AchievementRules.Comeback(),
                new AchievementRules.NightOwl(),
                new ExplorationRules.Constellation("KOD_AVCISI", "yazilim"),
                new ExplorationRules.Constellation("SINIR_AGI", "yapay-zeka"),
                new ExplorationRules.Constellation("KALKAN", "siber-guvenlik"),
                new ExplorationRules.Constellation("ROKET", "girisimcilik"),
                new AchievementRules.Dawn());
    }
}
