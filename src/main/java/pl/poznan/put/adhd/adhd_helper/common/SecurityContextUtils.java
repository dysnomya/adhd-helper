package pl.poznan.put.adhd.adhd_helper.common;

import lombok.experimental.UtilityClass;

import org.springframework.security.core.context.SecurityContextHolder;

import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

@UtilityClass
public class SecurityContextUtils {

    public AdhdUser getAdhdUser() {
        return (AdhdUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
