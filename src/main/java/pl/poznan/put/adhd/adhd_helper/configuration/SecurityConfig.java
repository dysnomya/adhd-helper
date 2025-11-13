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

import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.http.HttpStatus;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig implements WebMvcConfigurer {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http

                .csrf(AbstractHttpConfigurer::disable)   // Bo korzystamy z tokenów JWT
                .cors(Customizer.withDefaults())    // Włączenie współpracy CORS

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/auth/**", "/error").permitAll()
                        .anyRequest().authenticated()
                )

                // Włączenie Serwera Zasobów JWT (odczytywanie tokenów z nagłówka)
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))

                // Konfiguracja logowania Google
                .oauth2Login(Customizer.withDefaults())

                // Dodanie AuthenticationEntryPoint, aby zwracać 401 zamiast przekierowania na login
                .exceptionHandling(e -> e
                        // Gdy brak tokena, zwróć 401 Unauthorized zamiast 302 Redirect
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                )

                .build();
    }
}
