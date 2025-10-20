package pl.poznan.put.adhd.adhd_helper.user;

import lombok.AllArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    @GetMapping
    public Object getUserCredentials() {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String username = jwt.getClaimAsString("name");
        String userEmail = jwt.getClaimAsString("email");
        return username + " " + userEmail;
    }
}
