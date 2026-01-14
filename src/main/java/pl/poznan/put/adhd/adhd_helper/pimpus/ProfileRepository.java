package pl.poznan.put.adhd.adhd_helper.pimpus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

@Repository
public interface ProfileRepository extends JpaRepository<PimpusProfile, Long> {
    PimpusProfile findByUser(AdhdUser user);
}
