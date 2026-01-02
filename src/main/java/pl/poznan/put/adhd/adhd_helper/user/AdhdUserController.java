package pl.poznan.put.adhd.adhd_helper.user;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.poznan.put.adhd.adhd_helper.common.SecurityContextUtils;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdhdUserController {
    private final AdhdUserService adhdUserService;

    @GetMapping("/me")
    public AdhdUser me() {
        return SecurityContextUtils.getAdhdUser();
    }
}
