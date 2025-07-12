package org.comforent.controllers;

import lombok.RequiredArgsConstructor;
import org.comforent.config.UserDetailsImpl;
import org.comforent.dto.UserDTO;
import org.comforent.entity.User;
import org.comforent.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        // достаём пользователя из базы по email
        User user = userRepository.findByEmail(userDetails.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        UserDTO dto = new UserDTO(user.getFirstname(), user.getEmail(), user.getProfilePicture());
        return ResponseEntity.ok(dto);
    }
}
