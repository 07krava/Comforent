package org.comforent.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.comforent.validation.ValidPhoneNumber;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "First name is required")
    @Pattern(
        regexp = "^[A-ZА-Я][a-zа-я]+(-[A-ZА-Я]?[a-zа-я]+)*$",
        message = "First name must start with a capital letter and contain only letters or hyphens (not at the start or end)"
    )
    private String firstname;

    @NotBlank(message = "Last name is required")
    @Pattern(
        regexp = "^[A-ZА-Я][a-zа-я]+(-[A-ZА-Я]?[a-zа-я]+)*$",
        message = "Last name must start with a capital letter and contain only letters or hyphens (not at the start or end)"
    )
    private String lastname;
    @Email(message = "Must be a valid e-mail address")
    private String email;
    private String password;

    @ValidPhoneNumber
    private String phone;
}
