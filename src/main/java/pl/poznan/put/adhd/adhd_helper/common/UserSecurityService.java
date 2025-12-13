package pl.poznan.put.adhd.adhd_helper.common;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.user.AdhdUserToken;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserSecurityService {
    public AdhdUserToken getUser() {
        Jwt jwt = getJwt();

        String googleId = jwt.getClaimAsString("sub");
        String email = jwt.getClaimAsString("email");
        String name = jwt.getClaimAsString("given_name");
        String lastName = jwt.getClaimAsString("family_name");

        return new AdhdUserToken(name, lastName, email, googleId);
    }

    public String getGoogleId() {
        return getJwt().getClaimAsString("sub");
    }

    private Jwt getJwt() {
        return (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
