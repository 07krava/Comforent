package org.comforent.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.comforent.entity.User;
import org.comforent.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.Duration;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Value("${app.frontend.oauth2.success-path:/oauth2/redirect}")
    private String successPath;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        if (email == null || email.isEmpty()) {
            throw new OAuth2AuthenticationException("Email not provided by OAuth2 provider");
        }

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found after OAuth login"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRolesAsStrings());

        // Создаём безопасный JWT cookie
        ResponseCookie jwtCookie = ResponseCookie.from("jwt_token", token)
            .httpOnly(true)
            .secure(true) // включи HTTPS в production
            .path("/")
            .maxAge(Duration.ofDays(1))
            .sameSite("Lax") // "Strict" для максимум безопасности, "Lax" — компромисс
            .build();

        // Добавляем cookie в ответ
        response.addHeader("Set-Cookie", jwtCookie.toString());

        // Редирект на фронтенд без токена в URL
        String redirectUrl = frontendUrl + "/oauth2/redirect";
        response.sendRedirect(redirectUrl);

//        String redirectUrl = UriComponentsBuilder
//            .fromUriString(frontendUrl + successPath)
//            .queryParam("token", token)
//            .build()
//            .toUriString();

//        response.sendRedirect(redirectUrl);
    }
}
