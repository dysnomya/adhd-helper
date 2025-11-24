package pl.poznan.put.adhd.adhd_helper.user;

import jakarta.transaction.Transactional;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class AdhdUserService {

    private final AdhdUserRepository adhdUserRepository;

    public Optional<AdhdUser> findByGoogleId(String googleId) {
        return adhdUserRepository.findById(googleId);
    }

    @Transactional
    public AdhdUser createUser(AdhdUser adhdUser) {
        return adhdUserRepository.save(adhdUser);
    }
}
