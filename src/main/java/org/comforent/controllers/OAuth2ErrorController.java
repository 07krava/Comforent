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
        String messageKeyToUse; // Переменная для ключа, который будет фактически использоваться в MessageSource

        // Очищаем пользовательский ввод 'code' от потенциально опасных символов (новой строки, табуляции).
        // Эта очищенная версия будет использоваться для логирования.
        String sanitizedCodeForLog = (code != null) ? code.replaceAll("[\n\r\t]", "_") : "null";

        // Определяем, какой ключ сообщения использовать.
        // Мы НЕ будем напрямую использовать 'code' или 'sanitizedCodeForLog' как ключ для MessageSource,
        // если он не является одним из наших жестко закодированных, разрешенных ключей.
        if (code != null && !code.trim().isEmpty() && allowedErrorCodes.contains(code)) {
            // Если оригинальный 'code' (до очистки) содержится в наших разрешенных ключах,
            // используем его как ключ. Это безопасно, так как мы доверяем только нашим предопределенным ключам.
            messageKeyToUse = code;
        } else {
            // В противном случае, всегда используем ключ по умолчанию.
            // Это предотвращает использование любого потенциально "загрязненного" пользовательского ввода
            // в качестве ключа для MessageSource.
            messageKeyToUse = defaultKey;
            logger.debug("Invalid or unallowed OAuth2 error code received: {}, defaulting to: {}", sanitizedCodeForLog, defaultKey);
        }

        try {
            // Теперь мы передаем в messageSource.getMessage() только ключ, который гарантированно
            // является одним из наших жестко закодированных, безопасных ключей.
            errorMsg = messageSource.getMessage(messageKeyToUse, null, locale);
        } catch (NoSuchMessageException e) {
            // Если по какой-то причине сообщение не найдено даже для разрешенного ключа,
            // логируем это (используя очищенный пользовательский код для контекста)
            // и возвращаем сообщение по умолчанию.
            logger.debug("Message not found for determined key: {} (original sanitized code: {}), using default", messageKeyToUse, sanitizedCodeForLog);
            errorMsg = messageSource.getMessage(defaultKey, null, defaultMessage, locale);
        } catch (Exception e) {
            // Общая обработка других возможных исключений при получении сообщения.
            logger.error("An unexpected error occurred while retrieving message for key: {} (original sanitized code: {}): {}", messageKeyToUse, sanitizedCodeForLog, e.getMessage(), e);
            errorMsg = messageSource.getMessage(defaultKey, null, defaultMessage, locale);
        }

        logger.warn("OAuth2 authentication error occurred");

        // Логирование оригинального кода (очищенного для лога) для отладки.
        if (logger.isDebugEnabled() && code != null) {
            logger.debug("Original OAuth2 error code received (sanitized for log): {}", sanitizedCodeForLog);
        }

        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("error", errorMsg));
    }
}
