package pl.poznan.put.adhd.adhd_helper.user;

import jakarta.transaction.Transactional;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class AdhdUserService {

    private final AdhdUserRepository adhdUserRepository;
    private final AdhdUserMapper adhdUserMapper;

    @Transactional
    public AdhdUser saveOrUpdateUser(AdhdUserToken adhdUserToken) {
        AdhdUser existingUser =
                adhdUserRepository
                        .findByGoogleId(adhdUserToken.googleId())
                        .orElseGet(AdhdUser::new);

        adhdUserMapper.updateUserFromToken(adhdUserToken, existingUser);

        return existingUser;
    }
}
