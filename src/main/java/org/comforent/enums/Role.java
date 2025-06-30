package org.comforent.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    USER, ADMIN, OWNER, RENTER, MODERATOR;

    @Override
    public String getAuthority() {
        return "ROLE_" + name();
    }
}
