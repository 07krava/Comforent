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
    // Это критично для безопасности, чтобы не использовать произвольные строки как ключи сообщений.
    private static final Set<String> allowedErrorCodes = Set.of(
        "oauth2.error.invalid_token",
        "oauth2.error.access_denied",
        "oauth2.error.user_cancelled",
        "oauth2.error.default" // Включаем ключ по умолчанию в разрешенные
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

        // Очищаем пользовательский ввод 'code' от потенциально опасных символов (новой строки, табуляции).
        // Это предотвращает Log Injection и гарантирует, что даже если 'code' будет использоваться
        // в других контекстах (например, как ключ), он будет безопасным.
        String sanitizedCode = (code != null) ? code.replaceAll("[\n\r\t]", "_") : null;

        // Проверяем, что очищенный код не пуст и содержится в наборе разрешенных кодов.
        // Это обеспечивает, что мы пытаемся получить сообщение только для известных и безопасных ключей.
        if (sanitizedCode != null && !sanitizedCode.trim().isEmpty() && allowedErrorCodes.contains(sanitizedCode)) {
            try {
                // Используем очищенный и проверенный код в качестве ключа для получения сообщения.
                errorMsg = messageSource.getMessage(sanitizedCode, null, locale);
            } catch (NoSuchMessageException e) {
                // Если сообщение не найдено для очищенного кода (что может произойти, если ключ был удален
                // из ресурсов, но остался в allowedErrorCodes), логируем это и используем сообщение по умолчанию.
                logger.debug("Message not found for sanitized code: {}, using default", sanitizedCode);
                errorMsg = messageSource.getMessage(defaultKey, null, defaultMessage, locale);
            } catch (Exception e) {
                // Общая обработка других возможных исключений при получении сообщения,
                // логируем ошибку и используем сообщение по умолчанию.
                logger.error("An unexpected error occurred while retrieving message for code: {}", sanitizedCode, e);
                errorMsg = messageSource.getMessage(defaultKey, null, defaultMessage, locale);
            }
        } else {
            // Если исходный 'code' был null, пустой, или после очистки не соответствует
            // ни одному из разрешенных кодов, используем сообщение по умолчанию.
            logger.debug("Invalid or unallowed OAuth2 error code received (sanitized for log): {}, using default message.", sanitizedCode);
            errorMsg = messageSource.getMessage(defaultKey, null, defaultMessage, locale);
        }

        // Логируем общее предупреждение о произошедшей ошибке авторизации OAuth2.
        logger.warn("OAuth2 authentication error occurred");

        // Если включен режим отладки и оригинальный 'code' не был null,
        // логируем его очищенную версию для отладочных целей.
        if (logger.isDebugEnabled() && code != null) {
            logger.debug("Original OAuth2 error code received (sanitized for log): {}", sanitizedCode);
        }

        // Возвращаем HTTP-ответ со статусом UNAUTHORIZED и картой, содержащей сообщение об ошибке.
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("error", errorMsg));
    }
}
