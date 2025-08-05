package org.comforent.cloudflare;

import lombok.RequiredArgsConstructor;
import org.comforent.repository.UserRepository;
import org.comforent.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class CloudflareController {
    private final UserService userService;
    private final UserRepository userRepository;

    // ✅ Загрузка аватара текущего пользователя
    @PostMapping("/me/avatar")
    public ResponseEntity<String> uploadAvatar(Authentication authentication,
                                               @RequestParam("file") MultipartFile file) throws IOException {
        String email = authentication.getName(); // если ты используешь email как username
        userService.uploadProfilePictureByEmail(email, file);
        return ResponseEntity.ok("Avatar uploaded");
    }

    // ✅ Загрузка фото жилья текущего пользователя
    @PostMapping("/me/housing-photos")
    public ResponseEntity<String> uploadHousingPhoto(@AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails,
                                                     @RequestParam("file") MultipartFile file) throws IOException {
        String email = userDetails.getUsername();
        userService.uploadHousingPhotoByEmail(email, file);
        return ResponseEntity.ok("Housing photo uploaded");
    }

    // ✅ Получение ссылки на аватар по текущему пользователю
    @GetMapping("/me/profile-picture")
    public ResponseEntity<String> getProfilePicture(@AuthenticationPrincipal org.springframework.security.core.userdetails.User userDetails) {
        String email = userDetails.getUsername();
        String url = userService.getProfilePictureByEmail(email);
        return ResponseEntity.ok(url);
    }
}
