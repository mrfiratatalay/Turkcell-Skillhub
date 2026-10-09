package com.skillhub.guide.application;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app.guide")
public record GuideProperties(String anthropicApiKey, String model, Duration timeout, Duration cacheTtl,
                              int refreshLimitPerHour) {

    public boolean aiConfigured() {
        return anthropicApiKey != null && !anthropicApiKey.isBlank();
    }
}
