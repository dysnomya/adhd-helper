package pl.poznan.put.adhd.adhd_helper.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.poznan.put.adhd.adhd_helper.common.SecurityContextUtils;

@RestController
@RequestMapping("/api")
@Tag(name = "User", description = "Operations related to the currently authenticated user")
@RequiredArgsConstructor
public class AdhdUserController {

    @GetMapping("/me")
    @Operation(
            summary = "Get current user",
            description = "Returns information about the currently authenticated user.")
    public AdhdUser me() {
        return SecurityContextUtils.getAdhdUser();
    }
}
