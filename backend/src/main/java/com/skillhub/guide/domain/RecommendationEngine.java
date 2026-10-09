package com.skillhub.guide.domain;

import java.util.List;

/** Port: produces up to three recommendations from a learner profile. */
public interface RecommendationEngine {

    List<Recommendation> recommend(LearnerProfile profile);
}
