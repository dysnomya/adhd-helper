package pl.poznan.put.adhd.adhd_helper.user;

import jakarta.transaction.Transactional;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.common.UserSecurityService;

import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserSecurityService userSecurityService;

    @Transactional
    public void createUser() {
        userRepository.save(userSecurityService.getUser());
    }

    @Transactional
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Klient nie wysłał tokena
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Żądanie nie zawierało tokena lub token jest nieprawidłowy");
        }

        String userId = null;
        String userEmail = null;
        String userName = null;
        Object principal = authentication.getPrincipal();

        if (principal instanceof Jwt jwtPrincipal) {
            userId = jwtPrincipal.getClaimAsString("sub");
            userEmail = jwtPrincipal.getClaimAsString("email");
            userName = jwtPrincipal.getClaimAsString("name");

        } else if (principal instanceof OAuth2User oauth2User) {
            userId = oauth2User.getAttribute("sub");
            userEmail = oauth2User.getAttribute("email");
            userName = oauth2User.getAttribute("name");
        }

        if (userId == null || userEmail == null || userId.isEmpty()) {
            throw new IllegalStateException("Nie można ustalić ID i emaila użytkownika z tokena.");
        }

        final String finalId = userId;
        final String finalEmail = userEmail;
        final String finalName = userName;

        Optional<User> existingUser = userRepository.findById(finalId);

        if (existingUser.isPresent()) {
            return existingUser.get();
        } else {
            User newUser = User.builder().id(finalId).email(finalEmail).name(finalName).build();

            try {
                return userRepository.save(newUser);
            } catch (Exception e) {
                return userRepository
                        .findById(finalId)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Krytyczny błąd: Nie można stworzyć ani odczytać użytkownika.",
                                                e));
            }
        }
    }

    public String getCurrentUserId() {
        return getCurrentUser().getId();
    }
}
