package org.comforent.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;
import java.util.Map;

//@RestController
//@RequestMapping("/oauth2")
//public class OAuth2ErrorController {
//    private static final Logger logger = LoggerFactory.getLogger(OAuth2ErrorController.class);
//
//    private final MessageSource messageSource;
//
//    public OAuth2ErrorController(MessageSource messageSource) {
//        this.messageSource = messageSource;
//    }
//
//    @GetMapping("/error")
//    public ResponseEntity<Map<String, String>> handleError(@RequestParam(required = false) String code,
//                                                           Locale locale) {// Используем код вместо "message" и получаем из messages.properties
//        String errorMsg;
//
//        if (code != null && !code.isEmpty()) {
//            try {
//                errorMsg = messageSource.getMessage(code, null, locale);
//            } catch (Exception e) {
//                errorMsg = messageSource.getMessage("oauth2.error.default", null, "OAuth2 authorization failed", locale);
//            }
//        } else {
//            errorMsg = messageSource.getMessage("oauth2.error.default", null, "OAuth2 authorization failed", locale);
//        }
//
//        logger.warn("OAuth2 authentication error occurred");
//
//        return ResponseEntity
//            .status(HttpStatus.UNAUTHORIZED)
//            .body(Map.of("error", errorMsg));
//    }
//}

@RestController
@RequestMapping("/oauth2")
public class OAuth2ErrorController {

    private final MessageSource messageSource;
    private static final Logger logger = LoggerFactory.getLogger(OAuth2ErrorController.class);

    public OAuth2ErrorController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @GetMapping("/error")
    public ResponseEntity<Map<String, String>> handleError(@RequestParam(required = false) String code,
                                                           Locale locale) {
        String errorMsg;
        if (code != null && !code.isEmpty()) {
            try {
                errorMsg = messageSource.getMessage(code, null, locale);
            } catch (Exception e) {
                errorMsg = messageSource.getMessage("oauth2.error.default", null, "OAuth2 authorization failed", locale);
            }
        } else {
            errorMsg = messageSource.getMessage("oauth2.error.default", null, "OAuth2 authorization failed", locale);
        }

        logger.warn("OAuth2 authentication error occurred");

        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("error", errorMsg));
    }
}
