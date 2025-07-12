package org.comforent.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

//    @Pattern(regexp = "[A-Z][a-z]+",
//        message = "Must start with a capital letter followed by one or more lowercase letters")
    private String firstname;

//    @Pattern(regexp = "[A-Z][a-z]+",
//        message = "Must start with a capital letter followed by one or more lowercase letters")
    private String lastname;
    @Email(message = "Must be a valid e-mail address")
    private String email;
    private String password;
    private String phone;
}
