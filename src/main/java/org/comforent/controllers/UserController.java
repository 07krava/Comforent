package org.comforent.controllers;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.comforent.config.JwtUtil;
import org.comforent.config.UserDetailsImpl;
import org.comforent.dto.UserDTO;
import org.comforent.entity.User;
import org.comforent.repository.UserRepository;
import org.comforent.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userRepository.findByEmail(userDetails.getEmail())
            .orElseThrow(() -> new EntityNotFoundException("User not found"));

        UserDTO dto = new UserDTO(user.getFirstname(), user.getEmail(), user.getProfilePicture());
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/upload-profile-picture")
    public ResponseEntity<Object> uploadProfilePicture(
        @RequestHeader("Authorization") String authHeader,
        @RequestParam("file") MultipartFile file) throws IOException {

        String token = authHeader.replace("Bearer ", "");
        String userEmail = jwtUtil.getUsernameFromToken(token);
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

        userService.uploadProfilePicture(user.getId(), file);
        return ResponseEntity.ok().build();
    }
}
