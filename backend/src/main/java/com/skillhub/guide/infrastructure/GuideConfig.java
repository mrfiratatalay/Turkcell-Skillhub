package com.skillhub.guide.infrastructure;

import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.skillhub.guide.application.AiGuide;
import com.skillhub.guide.application.GuideProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tools.jackson.databind.json.JsonMapper;

/** Registers the Claude guide only when an API key is configured; otherwise the rule engine serves alone. */
@Configuration
class GuideConfig {

    @Bean
    @ConditionalOnExpression("!'${app.guide.anthropic-api-key:}'.isBlank()")
    AiGuide claudeGuide(GuideProperties properties, JsonMapper json) {
        var client = AnthropicOkHttpClient.builder()
                .apiKey(properties.anthropicApiKey())
                .timeout(properties.timeout())
                .maxRetries(1)
                .build();
        return new ClaudeGuide(client, properties.model(), json);
    }
}
