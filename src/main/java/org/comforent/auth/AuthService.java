package org.comforent.auth;

import lombok.RequiredArgsConstructor;
import org.comforent.config.JwtUtil;
import org.comforent.entity.User;
import org.comforent.enums.Role;
import org.comforent.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthenticationResponse register(RegisterRequest request) {

        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User with this email already exists.");
        }

        User user = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Collections.singleton(Role.USER))
            .phone(request.getPhone())
            .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRolesAsStrings());
        return AuthenticationResponse.builder()
            .token(token)
            .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found after authentication."));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRolesAsStrings());
        return AuthenticationResponse.builder()
            .token(token)
            .build();
    }
}
