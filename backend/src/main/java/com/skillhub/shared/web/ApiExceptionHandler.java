package com.skillhub.shared.web;

import com.skillhub.shared.error.DomainException;
import java.util.LinkedHashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/** Every error leaves the API as an RFC 9457 Problem Details document. */
@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(ApiExceptionHandler.class);

    @ExceptionHandler(DomainException.class)
    ProblemDetail handleDomain(DomainException ex) {
        HttpStatus status = switch (ex) {
            case DomainException.NotFound ignored -> HttpStatus.NOT_FOUND;
            case DomainException.Conflict ignored -> HttpStatus.CONFLICT;
            case DomainException.Forbidden ignored -> HttpStatus.FORBIDDEN;
            case DomainException.Invalid ignored -> HttpStatus.BAD_REQUEST;
            case DomainException.Unauthorized ignored -> HttpStatus.UNAUTHORIZED;
            case DomainException.RateLimited ignored -> HttpStatus.TOO_MANY_REQUESTS;
        };
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(status, ex.getMessage());
        problem.setTitle(ex.title());
        return problem;
    }

    @ExceptionHandler(Exception.class)
    ProblemDetail handleUnexpected(Exception ex) {
        log.error("Unexpected error", ex);
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.INTERNAL_SERVER_ERROR, "Beklenmeyen bir hata oluştu. Lütfen tekrar dene.");
        problem.setTitle("Sunucu hatası");
        return problem;
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, String> errors = new LinkedHashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.putIfAbsent(error.getField(), error.getDefaultMessage());
        }
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Lütfen alanları kontrol et.");
        problem.setTitle("Geçersiz istek");
        problem.setProperty("errors", errors);
        return ResponseEntity.badRequest().body(problem);
    }

    @Override
    protected ResponseEntity<Object> createResponseEntity(
            Object body, HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        if (body instanceof ProblemDetail problem && problem.getTitle() == null) {
            problem.setTitle(HttpStatus.valueOf(statusCode.value()).getReasonPhrase());
        }
        return super.createResponseEntity(body, headers, statusCode, request);
    }
}
