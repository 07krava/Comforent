package org.comforent.auth;

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
    @Pattern(regexp = "[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}", message = "Invalid email")
    private String email;
    private String password;
    private String phone;
}
