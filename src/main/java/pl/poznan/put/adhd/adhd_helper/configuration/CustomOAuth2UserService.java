package pl.poznan.put.adhd.adhd_helper.configuration;

import lombok.RequiredArgsConstructor;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUserService;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final AdhdUserService adhdUserService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oauthUser = super.loadUser(userRequest);

        String googleId = oauthUser.getAttribute("sub");
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        adhdUserService
                .findByGoogleId(googleId)
                .orElseGet(
                        () ->
                                adhdUserService.createUser(
                                        AdhdUser.builder()
                                                .googleId(googleId)
                                                .name(name)
                                                .email(email)
                                                .build()));

        return oauthUser;
    }
}
