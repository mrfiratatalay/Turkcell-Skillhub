package com.skillhub.shared.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import java.time.Clock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class PlatformConfig {

    private static final String BEARER = "bearer-jwt";

    /** Injected everywhere time matters, so business rules never call Instant.now() directly. */
    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }

    @Bean
    OpenAPI skillHubOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("SkillHub API")
                        .version("2.0.0")
                        .description("Code Night ruhuyla oyunlaştırılmış dijital beceri platformu. "
                                + "Önce /api/v1/auth/login ile token al, sonra Authorize'a yapıştır."))
                .components(new Components().addSecuritySchemes(BEARER, new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList(BEARER));
    }
}
