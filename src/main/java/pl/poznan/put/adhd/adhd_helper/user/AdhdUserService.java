package pl.poznan.put.adhd.adhd_helper.user;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pl.poznan.put.adhd.adhd_helper.pimpus.ProfileService;

@Service
@Slf4j
@AllArgsConstructor
public class AdhdUserService {

    private final AdhdUserRepository adhdUserRepository;
    private final AdhdUserMapper adhdUserMapper;
    private final ProfileService profileService;

    @Transactional
    public AdhdUser createOrGetUser(AdhdUserToken token) {
        return adhdUserRepository
                .findByGoogleId(token.googleId())
                .map(user -> adhdUserMapper.updateUserFromToken(token, user))
                .orElseGet(() -> createNewUser(token));
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    protected AdhdUser createNewUser(AdhdUserToken token) {
        AdhdUser user = new AdhdUser();
        adhdUserMapper.updateUserFromToken(token, user);

        try {
            AdhdUser savedUser = adhdUserRepository.saveAndFlush(user);
            profileService.ensureProfileExists(savedUser);
            return savedUser;
        } catch (DataIntegrityViolationException e) {
            // Another request inserted the user concurrently
            return adhdUserRepository.findByGoogleId(token.googleId()).orElseThrow(() -> e);
        }
    }
}
