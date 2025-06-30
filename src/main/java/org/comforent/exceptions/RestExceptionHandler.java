package org.comforent.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.util.Map;

@Slf4j
@ControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(S3Exception.class)
    public ResponseEntity<Map<String, Object>> handleS3Exception(S3Exception ex) {
        log.error("S3 error: {}", ex.getMessage(), ex);
        return ResponseEntity
            .status(HttpStatus.BAD_GATEWAY)
            .body(Map.of(
                "error", "Ошибка при работе с хранилищем",
                "details", ex.getMessage()
            ));
    }
}
