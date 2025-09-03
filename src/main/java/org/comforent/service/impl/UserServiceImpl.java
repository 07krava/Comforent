package org.comforent.service.impl;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.comforent.cloudflare.CloudflareStorageService;
import org.comforent.entity.User;
import org.comforent.exceptions.exceptions.FailedFileDownloadException;
import org.comforent.exceptions.exceptions.UploadingFileToStorageException;
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
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

            String email = user.getEmail();
            String filename = file.getOriginalFilename();

            if (filename == null || filename.isBlank()) {
                throw new FailedFileDownloadException("Имя файла пустое.");
            }

            // путь вида: email/avatar/filename
            String key = email + "/avatar/" + filename;

            // если файл уже существует, не загружаем его повторно
            if (storageService.exists(key)) {
                log.info("The file already exists: {}", key);
                return;
            }

            byte[] content = file.getBytes();

            // Загружаем в Cloudflare Images и получаем URL
            String fileUrl = storageService.upload(key, content);

            // Сохраняем URL в пользователя
            user.setProfilePicture(fileUrl);
            userRepository.save(user);

            log.info("Загружен аватар userId={} url={}", userId, fileUrl);

        } catch (IOException e) {
            log.error("Ошибка чтения файла", e);
            throw new FailedFileDownloadException("Не удалось прочитать файл для загрузки.");
        } catch (S3Exception e) {
            log.error("Ошибка загрузки в Cloudflare: {}", e.getMessage(), e);
            throw new UploadingFileToStorageException("Ошибка при загрузке файла в хранилище.");
        }
    }

    @Override
    @Transactional
    public void uploadHousingPhoto(Long userId, MultipartFile file) {
        try {
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

            String email = user.getEmail();
            String filename = file.getOriginalFilename();

            if (filename == null || filename.isBlank()) {
                throw new FailedFileDownloadException("Имя файла пустое.");
            }

            String key = email + "/housings/" + filename;

            if (storageService.exists(key)) {
                log.info("Файл уже существует: {}", key);
                return;
            }

            byte[] content = file.getBytes();
            storageService.upload(key, content);

            log.info("Загружено фото жилья userId={} key={}", userId, key);

        } catch (IOException e) {
            log.error("Ошибка чтения файла", e);
            throw new FailedFileDownloadException("Не удалось прочитать файл для загрузки.");
        } catch (S3Exception e) {
            log.error("Ошибка загрузки в Cloudflare: {}", e.getMessage(), e);
            throw new UploadingFileToStorageException("Ошибка при загрузке файла в хранилище.");
        }
    }

    public String getProfilePicture(Long userId) {
        return userRepository.findById(userId)
            .map(User::getProfilePicture)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void uploadProfilePictureByEmail(String email, MultipartFile file) throws IOException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));

        String filename = file.getOriginalFilename();
        byte[] content = file.getBytes();

        String url = storageService.uploadAvatar(email, filename, content);
        user.setProfilePicture(url);
        userRepository.save(user);
    }

    public void uploadHousingPhotoByEmail(String email, MultipartFile file) throws IOException {
//        User user = userRepository.findByEmail(email)
//            .orElseThrow(() -> new EntityNotFoundException("User not found"));

        String filename = file.getOriginalFilename();
        byte[] content = file.getBytes();

        String url = storageService.uploadHousingPhoto(email, filename, content);

        //TODO: Either save photo in Housing table or return URL
        log.info("Housing photo uploaded to: {}", url);
    }

    public String getProfilePictureByEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return user.getProfilePicture();
    }
}


