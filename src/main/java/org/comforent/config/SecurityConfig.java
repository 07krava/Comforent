package org.comforent.config;

import jakarta.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Configuration
public class SecurityConfig {

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendBaseUrl;

    @Value("${app.frontend.oauth2.error-path}")
    private String oauth2ErrorPath;

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final CustomOAuth2UserService oAuth2UserService;
    private final CustomUserDetailsService userDetailsService;
    private final OAuth2AuthenticationSuccessHandler successHandler;
    private final MessageSource messageSource;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    public SecurityConfig(
        JwtAuthenticationFilter jwtAuthFilter,
        CustomOAuth2UserService oAuth2UserService,
        CustomUserDetailsService userDetailsService,
        OAuth2AuthenticationSuccessHandler successHandler,
        MessageSource messageSource,
        RestAuthenticationEntryPoint restAuthenticationEntryPoint
    ) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.oAuth2UserService = oAuth2UserService;
        this.userDetailsService = userDetailsService;
        this.successHandler = successHandler;
        this.messageSource = messageSource;
        this.restAuthenticationEntryPoint = restAuthenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/oauth2/**", "/login/oauth2/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(restAuthenticationEntryPoint) // <-- добавьте эту строку
            )
            .oauth2Login(oauth -> oauth
                .userInfoEndpoint(user -> user.userService(oAuth2UserService))
                .successHandler(successHandler)
                .failureHandler((request, response, exception) -> {
                    String message;

                    if (exception.getCause() instanceof ConstraintViolationException) {
                        message = messageSource.getMessage(
                            "oauth2.error.constraint.violation", null, request.getLocale());
                    } else {
                        message = messageSource.getMessage(
                            "oauth2.error.generic", null, request.getLocale());
                    }

                    String redirectUrl = UriComponentsBuilder
                        .fromUriString(frontendBaseUrl + oauth2ErrorPath)
                        .queryParam("message", URLEncoder.encode(message, StandardCharsets.UTF_8))
                        .build().toUriString();

                    response.sendRedirect(redirectUrl);
                })
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
