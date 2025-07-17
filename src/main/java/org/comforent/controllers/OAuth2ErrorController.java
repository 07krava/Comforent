package org.comforent.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/oauth2")
public class OAuth2ErrorController {
    private final MessageSource messageSource;
    private static final Logger logger = LoggerFactory.getLogger(OAuth2ErrorController.class);

    private static final Set<String> allowedErrorCodes = Set.of(
        "oauth2.error.invalid_token",
        "oauth2.error.access_denied",
        "oauth2.error.user_cancelled"
    );

    public OAuth2ErrorController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    /**
     * Проверяет, входит ли переданный код ошибки в белый список разрешённых кодов.
     */
    private boolean isAllowedErrorCode(String code) {
        return allowedErrorCodes.contains(code);
    }

    private String getSafeMessage(String code, Locale locale) {
        if (!isAllowedErrorCode(code)) {
            throw new IllegalArgumentException("Disallowed error code");
        }
        return messageSource.getMessage(code, null, locale);
    }

    @GetMapping("/error")
    public ResponseEntity<Map<String, String>> handleError(@RequestParam(required = false) String code,
                                                           Locale locale) {
        final String defaultMessage = "OAuth2 authorization failed";
        final String defaultKey = "oauth2.error.default";

        String sanitizedCodeForLog = (code != null) ? code.replaceAll("[\n\r\t]", "_") : "null";
        String errorMsg;

        if (code != null && !code.trim().isEmpty() && isAllowedErrorCode(code)) {
            try {
                // Обеспечиваем вызов только с безопасным кодом из белого списка
                errorMsg = getSafeMessage(code, locale);
            } catch (NoSuchMessageException e) {
                logger.debug("Message not found for code: {}, using default", sanitizedCodeForLog);
                errorMsg = messageSource.getMessage(defaultKey, null, defaultMessage, locale);
            }
        } else {
            errorMsg = messageSource.getMessage(defaultKey, null, defaultMessage, locale);
        }

        logger.warn("OAuth2 authentication error occurred");

        if (logger.isDebugEnabled() && code != null) {
            logger.debug("Received OAuth2 error code: {}", sanitizedCodeForLog);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", errorMsg));
    }
}
