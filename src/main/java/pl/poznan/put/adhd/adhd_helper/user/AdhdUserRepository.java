package pl.poznan.put.adhd.adhd_helper.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
interface AdhdUserRepository extends JpaRepository<AdhdUser, Long> {
    Optional<AdhdUser> getByGoogleId(String googleId);
}
