package pl.poznan.put.adhd.adhd_helper.configuration;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig implements WebMvcConfigurer {
    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable) // Bo korzystamy z tokenów JWT
                .cors(Customizer.withDefaults()) // Włączenie współpracy CORS
                .authorizeHttpRequests(
                        auth ->
                                auth.requestMatchers("/", "/auth/**", "/error")
                                        .permitAll()
                                        .anyRequest()
                                        .authenticated())

                // Włączenie Serwera Zasobów JWT (odczytywanie tokenów z nagłówka)
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))

                // Tworzenie usera, jeśli nie jest on jeszcze w db
                .oauth2Login(
                        oauth ->
                                oauth.userInfoEndpoint(
                                        info -> info.userService(customOAuth2UserService)))
                .build();
    }
}
