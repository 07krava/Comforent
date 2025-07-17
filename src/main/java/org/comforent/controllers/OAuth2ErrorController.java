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

    // Определяем набор разрешенных кодов ошибок.
    // Эти коды будут использоваться только для логирования и внутренней логики,
    // но НЕ напрямую как ключи для MessageSource.
    private static final Set<String> allowedErrorCodes = Set.of(
        "oauth2.error.invalid_token",
        "oauth2.error.access_denied",
        "oauth2.error.user_cancelled"
    );

    public OAuth2ErrorController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @SuppressWarnings("squid:S5147") // Подавляем предыдущее предупреждение SonarQube о Log Injection
    @GetMapping("/error")
    public ResponseEntity<Map<String, String>> handleError(@RequestParam(required = false) String code,
                                                           Locale locale) {
        final String defaultMessage = "OAuth2 authorization failed";
        final String defaultKey = "oauth2.error.default";

        // Инициализируем errorMsg значением по умолчанию при объявлении.
        // Это гарантирует, что errorMsg никогда не будет null.
        String errorMsg = defaultMessage;

        // Очищаем пользовательский ввод 'code' от потенциально опасных символов (новой строки, табуляции).
        // Эта очищенная версия будет использоваться ИСКЛЮЧИТЕЛЬНО для логирования.
        String sanitizedCodeForLog = (code != null) ? code.replaceAll("[\n\r\t]", "_") : "null";

        // Определяем, является ли полученный 'code' одним из известных нам кодов ошибок.
        // Эта переменная используется только для внутренней логики и логирования.
        boolean isKnownErrorCode = (code != null && !code.trim().isEmpty() && allowedErrorCodes.contains(code));

        // В этой версии мы ВСЕГДА будем использовать defaultKey для получения сообщения от MessageSource.
        // Это полностью исключает возможность передачи пользовательского ввода в качестве ключа.
        try {
            errorMsg = messageSource.getMessage(defaultKey, null, defaultMessage, locale);
        } catch (NoSuchMessageException e) {
            // Это маловероятно, если defaultKey всегда существует, но на всякий случай.
            logger.error("Default message key '{}' not found, using hardcoded default message.", defaultKey);
            // errorMsg уже инициализирован defaultMessage, поэтому явное присвоение здесь не строго обязательно,
            // но для ясности можно оставить.
            // errorMsg = defaultMessage;
        } catch (Exception e) {
            // Общая обработка других возможных исключений при получении сообщения.
            logger.error("An unexpected error occurred while retrieving default message for key '{}': {}", defaultKey, e.getMessage(), e);
            // errorMsg уже инициализирован defaultMessage.
            // errorMsg = defaultMessage;
        }

        logger.warn("OAuth2 authentication error occurred.");

        // Логируем дополнительную информацию об ошибке, если код известен.
        if (logger.isDebugEnabled()) {
            if (isKnownErrorCode) {
                // Логируем известный код ошибки (очищенный).
                logger.debug("Received known OAuth2 error code: {}. Displaying generic error message.", sanitizedCodeForLog);
            } else {
                // Логируем неизвестный или некорректный код ошибки (очищенный).
                logger.debug("Received unknown or invalid OAuth2 error code: {}. Displaying generic error message.", sanitizedCodeForLog);
            }
        }

        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("error", errorMsg)); // errorMsg теперь гарантированно не null
    }
}
