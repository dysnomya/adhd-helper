package pl.poznan.put.adhd.adhd_helper.user;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private final UserService userService;

    @GetMapping
    public String getUserCredentials() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof Jwt jwt) {
            String userId = jwt.getClaimAsString("sub");
            String username = jwt.getClaimAsString("name");
            String userEmail = jwt.getClaimAsString("email");
            return userId + " " + username + " " + userEmail;
        } else {
            return "User is not authenticated with JWT";
        }
    }

    // Endpoint do sprawdzenia statusu logowania
    @GetMapping("/me")
    public User user(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return null;
        }

        return userService.getCurrentUser();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void login() {
        userService.createUser();
    }
}
