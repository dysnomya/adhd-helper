package pl.poznan.put.adhd.adhd_helper.configuration.audit;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import pl.poznan.put.adhd.adhd_helper.common.UserSecurityService;
import pl.poznan.put.adhd.adhd_helper.user.User;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
@RequiredArgsConstructor
class SpringSecurityAuditorAware implements AuditorAware<User> {

    private final UserSecurityService userSecurityService;

    @Override
    public Optional<User> getCurrentAuditor() {
        return Optional.ofNullable(userSecurityService.getUser());
    }
}
