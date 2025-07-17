package org.comforent.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.comforent.entity.User;
import org.comforent.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found after OAuth login"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRolesAsStrings());

        // Безопаснее передавать JWT через HttpOnly cookie, чтобы токен не попадал в URL, логи и историю браузера
        Cookie jwtCookie = new Cookie("jwt_token", token);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true); // включить если используешь HTTPS
        jwtCookie.setPath("/"); // доступен для всего сайта
        jwtCookie.setMaxAge(60 * 60 * 24); // например, 1 день
        response.addCookie(jwtCookie);

        // Редирект на фронтенд без токена в URL
        String redirectUrl = frontendUrl + "/oauth2/redirect";
        response.sendRedirect(redirectUrl);
    }
}
