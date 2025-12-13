package pl.poznan.put.adhd.adhd_helper.configuration;

import lombok.RequiredArgsConstructor;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import pl.poznan.put.adhd.adhd_helper.user.AdhdUserService;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUserToken;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CustomJwtAuthenticationConverter
        implements Converter<Jwt, AbstractAuthenticationToken> {
    private final AdhdUserService adhdUserService;

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        AdhdUserToken tokenUser =
                new AdhdUserToken(
                        jwt.getClaimAsString("sub"),
                        jwt.getClaimAsString("email"),
                        jwt.getClaimAsString("given_name"),
                        jwt.getClaimAsString("family_name"));

        adhdUserService.saveOrUpdateUser(tokenUser);

        return new JwtAuthenticationToken(jwt, List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
