package pl.poznan.put.adhd.adhd_helper.configuration.audit;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.lang.NonNull;

import pl.poznan.put.adhd.adhd_helper.common.UserSecurityService;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
@RequiredArgsConstructor
class SpringSecurityAuditorAware implements AuditorAware<AdhdUser> {

    private final UserSecurityService userSecurityService;

    @Override
    public @NonNull Optional<AdhdUser> getCurrentAuditor() {
        return Optional.ofNullable(userSecurityService.getUser());
    }
}
