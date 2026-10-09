package com.skillhub.shared.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/** Keeps 401 responses consistent with the rest of the API (RFC 9457). */
@Component
class ProblemJsonEntryPoint implements AuthenticationEntryPoint {

    private static final String BODY = """
            {"type":"about:blank","title":"Kimlik doğrulanamadı","status":401,\
            "detail":"Oturumun bulunamadı ya da süresi doldu. Lütfen tekrar giriş yap."}""";

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_PROBLEM_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.getWriter().write(BODY);
    }
}
