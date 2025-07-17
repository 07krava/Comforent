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

    @GetMapping("/error")
    public ResponseEntity<Map<String, String>> handleError(@RequestParam(required = false) String code,
                                                           Locale locale) {
        final String defaultMessage = "OAuth2 authorization failed";
        final String defaultKey = "oauth2.error.default";

        String errorMsg;

        // Очищаем пользовательский ввод 'code' в начале метода,
        // чтобы использовать очищенную версию для всех лог-сообщений.
        // Заменяем символы новой строки и табуляции на подчеркивание.
        String sanitizedCodeForLog = (code != null) ? code.replaceAll("[\n\r\t]", "_") : "null";


        if (code != null && !code.trim().isEmpty() && allowedErrorCodes.contains(code)) {
            try {
                errorMsg = messageSource.getMessage(code, null, locale);
            } catch (NoSuchMessageException e) {
                // Используем очищенный код для логирования, чтобы предотвратить инъекции.
                logger.debug("Message not found for code: {}, using default", sanitizedCodeForLog);
                errorMsg = messageSource.getMessage(defaultKey, null, defaultMessage, locale);
            }
        } else {
            errorMsg = messageSource.getMessage(defaultKey, null, defaultMessage, locale);
        }

        logger.warn("OAuth2 authentication error occurred");

        // Этот блок уже использовал очистку, но теперь мы используем общую переменную
        // sanitizedCodeForLog для единообразия.
        if (logger.isDebugEnabled() && code != null) {
            logger.debug("Received OAuth2 error code: {}", sanitizedCodeForLog);
        }

        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("error", errorMsg));
    }
}
