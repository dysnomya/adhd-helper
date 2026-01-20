package pl.poznan.put.adhd.adhd_helper.pimpus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface ProfileRepository extends JpaRepository<PimpusProfile, Long> {
    Optional<PimpusProfile> findByUser(AdhdUser user);

    Stream<PimpusProfile> findByUserIn(Collection<AdhdUser> users);
}
