package org.comforent.cloudflare;

import lombok.RequiredArgsConstructor;
import org.comforent.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class CloudflareController {
    private final UserService userService;

    @PostMapping("/{id}/profile-picture")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable Long id,
                                                       @RequestParam("file") MultipartFile file) throws IOException {
        userService.uploadProfilePicture(id, file);
        return ResponseEntity.ok("Uploaded successfully");
    }

    @GetMapping("/{id}/profile-picture")
    public ResponseEntity<String> getProfilePicture(@PathVariable Long id) {
        String url = userService.getProfilePicture(id);
        return ResponseEntity.ok(url);
    }
}
