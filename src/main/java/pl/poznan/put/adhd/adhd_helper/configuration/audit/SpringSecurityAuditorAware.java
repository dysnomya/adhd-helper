package pl.poznan.put.adhd.adhd_helper.configuration.audit;

import lombok.extern.slf4j.Slf4j;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.lang.NonNull;

import pl.poznan.put.adhd.adhd_helper.common.SecurityContextUtils;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
@Slf4j
class SpringSecurityAuditorAware implements AuditorAware<AdhdUser> {

    @Override
    public @NonNull Optional<AdhdUser> getCurrentAuditor() {
        return Optional.ofNullable(SecurityContextUtils.getAdhdUser());
    }
}
