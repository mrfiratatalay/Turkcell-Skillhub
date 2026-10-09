package com.skillhub.progress.domain.badge;

import com.skillhub.catalog.domain.Catalog;
import com.skillhub.progress.domain.LearnerStats;
import java.time.Instant;

/** Input of every badge rule: the learner's stats, the content catalog and the attempt that triggered evaluation. */
public record BadgeContext(LearnerStats stats, Catalog catalog, Trigger trigger) {

    /** The quiz attempt that was just completed. */
    public record Trigger(Instant at, int score, boolean passed, boolean failedBefore) {
    }
}
