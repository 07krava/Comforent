package org.comforent.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.comforent.cloudflare.CloudflareStorageService;
import org.comforent.entity.User;
import org.comforent.repository.UserRepository;
import org.comforent.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final CloudflareStorageService storageService;

    @Override
    @Transactional
    public void uploadProfilePicture(Long userId, MultipartFile file) {
        try {
            String key = userId + "/" + file.getOriginalFilename();
            byte[] content = file.getBytes();

            // Загрузка и получение публичного URL
            String fileUrl = storageService.upload(key, content);

            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

            user.setProfilePicture(fileUrl);
            userRepository.save(user);

            log.info("Uploaded and saved profile picture for userId={} url={}", userId, fileUrl);

        } catch (IOException e) {
            log.error("Failed to read uploaded file", e);
            throw new RuntimeException("Не удалось прочитать файл для загрузки.");
        } catch (S3Exception e) {
            log.error("S3 upload failed: {}", e.getMessage(), e);
            throw new RuntimeException("Ошибка при загрузке файла в хранилище.");
        }
    }

    public String getProfilePicture(Long userId) {
        return userRepository.findById(userId)
            .map(User::getProfilePicture)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
