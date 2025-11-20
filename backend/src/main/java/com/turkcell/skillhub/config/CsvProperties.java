package com.turkcell.skillhub.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Map;

@Data
@Component
@ConfigurationProperties(prefix = "app.csv")
public class CsvProperties {
    private String basePath;
    private Map<String, String> files;
}

