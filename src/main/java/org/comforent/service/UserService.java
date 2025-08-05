package org.comforent.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {

    void uploadProfilePicture(Long userId, MultipartFile file) throws IOException;

    void uploadHousingPhoto(Long userId, MultipartFile file);

    String getProfilePicture(Long userId);

    void uploadProfilePictureByEmail(String email, MultipartFile file) throws IOException;

    void uploadHousingPhotoByEmail(String email, MultipartFile file) throws IOException;

    String getProfilePictureByEmail(String email);
}
