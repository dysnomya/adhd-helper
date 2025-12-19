package pl.poznan.put.adhd.adhd_helper.user;

import jakarta.transaction.Transactional;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.common.UserSecurityService;

@Service
@Slf4j
@AllArgsConstructor
public class AdhdUserService {

    private final AdhdUserRepository adhdUserRepository;
    private final UserSecurityService userSecurityService;
    private final AdhdUserMapper adhdUserMapper;

    public AdhdUser getCurrentUser() {

        return adhdUserRepository.getByGoogleId(userSecurityService.getGoogleId()).orElseThrow();
    }

    @Transactional
    public void saveOrUpdateUser(AdhdUserToken adhdUserToken) {
        AdhdUser existingUser =
                adhdUserRepository.getByGoogleId(adhdUserToken.googleId()).orElseGet(AdhdUser::new);

        adhdUserMapper.updateUserFromToken(adhdUserToken, existingUser);
        adhdUserRepository.save(existingUser);
    }
}
