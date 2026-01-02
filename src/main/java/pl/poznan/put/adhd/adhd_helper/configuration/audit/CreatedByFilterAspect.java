package pl.poznan.put.adhd.adhd_helper.configuration.audit;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.hibernate.Session;
import org.springframework.stereotype.Component;

import pl.poznan.put.adhd.adhd_helper.common.SecurityContextUtils;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

@Aspect
@Component
public class CreatedByFilterAspect {
    @PersistenceContext private EntityManager entityManager;

    @Around("@annotation(EnableUserFilter) || @within(EnableUserFilter)")
    public Object enableFilter(ProceedingJoinPoint pjp) throws Throwable {
        Session session = entityManager.unwrap(Session.class);
        AdhdUser user = SecurityContextUtils.getAdhdUser();

        System.out.println("Enabling Filter");
        try {
            session.enableFilter("createdByFilter").setParameter("userId", user.getId());

            return pjp.proceed();
        } finally {
            session.disableFilter("createdByFilter");
        }
    }
}
