package pl.poznan.put.adhd.adhd_helper.common;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.user.User;

@Service
@RequiredArgsConstructor
public class UserSecurityService {
    public User getUser() {
        return User.builder().id(getSub()).name(getName()).email(getEmail()).build();
    }

    public String getSub() {
        return getJwt().getClaimAsString("sub");
    }

    public String getEmail() {
        return getJwt().getClaimAsString("email");
    }

    public String getName() {
        return getJwt().getClaimAsString("name");
    }

    private Jwt getJwt() {
        return (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
