package org.comforent.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.comforent.enums.Role;
import jakarta.validation.constraints.Pattern;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@EqualsAndHashCode
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Pattern(regexp = "[A-Z][a-z]+",
//        message = "Must start with a capital letter followed by one or more lowercase letters")
    @Column(nullable = false)
    private String firstname;

//    @Pattern(regexp = "[A-Z][a-z]+",
//        message = "Must start with a capital letter followed by one or more lowercase letters")
    @Column(nullable = false)
    private String lastname;

    @Email(message = "Must be a valid e-mail address")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(unique = true)
    private String phone;

    private Double rating;

    private String city;

    private String profilePicture;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Set<Role> role = new HashSet<>();

    public Set<String> getRolesAsStrings() {
        return role.stream()
            .map(Enum::name)
            .collect(java.util.stream.Collectors.toSet());
    }
}
