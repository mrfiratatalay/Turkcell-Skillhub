package com.skillhub.guide.application;

import com.skillhub.guide.domain.RecommendationEngine;

/** Port for an LLM-backed engine. Optional at runtime: without an API key the rule engine serves alone. */
public interface AiGuide extends RecommendationEngine {

    String modelName();
}
