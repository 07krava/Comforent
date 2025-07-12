package org.comforent.config;

import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.comforent.entity.User;
import org.comforent.enums.Role;
import org.comforent.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) {
        OAuth2User oAuth2User = super.loadUser(request);
        String email = oAuth2User.getAttribute("email");
        String fullName = oAuth2User.getAttribute("name");

        String[] nameParts = fullName != null ? fullName.split(" ", 2) : new String[]{"Google", "User"};
        String firstname = nameParts[0];
        String lastname = nameParts.length > 1 ? nameParts[1] : "User";

        try {
            User user = userRepository.findByEmail(email).orElseGet(() -> {
                User newUser = User.builder()
                    .email(email)
                    .firstname(firstname)
                    .lastname(lastname)
                    .password(new BCryptPasswordEncoder().encode(UUID.randomUUID().toString()))
                    .role(Set.of(Role.USER))
                    .build();
                return userRepository.save(newUser);
            });

            return new DefaultOAuth2User(
                Collections.singleton(new OAuth2UserAuthority(oAuth2User.getAttributes())),
                oAuth2User.getAttributes(),
                "email"
            );

        } catch (ConstraintViolationException e) {
            String message = e.getConstraintViolations().stream()
                .map(v -> mapToFriendlyFieldName(v.getPropertyPath().toString()) + ": " + v.getMessage())
                .collect(Collectors.joining(", "));

            throw new OAuth2AuthenticationException("Ошибка валидации: " + message);
        }
    }

    private String mapToFriendlyFieldName(String field) {
        return switch (field) {
            case "firstname" -> "Имя";
            case "lastname" -> "Фамилия";
            case "email" -> "Email";
            default -> field;
        };
    }
}
