package org.comforent.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.comforent.validation.ValidPhoneNumber;
import org.comforent.validation.ValidationPatterns;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "First name is required")
    @Pattern(regexp = ValidationPatterns.NAME_PATTERN, message = ValidationPatterns.NAME_MESSAGE)
    private String firstname;

    @NotBlank(message = "Last name is required")
    @Pattern(regexp = ValidationPatterns.NAME_PATTERN, message = ValidationPatterns.NAME_MESSAGE)
    private String lastname;

    @Email(message = "Must be a valid e-mail address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @ValidPhoneNumber
    private String phone;
}
