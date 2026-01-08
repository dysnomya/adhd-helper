package pl.poznan.put.adhd.adhd_helper.pimpus;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pl.poznan.put.adhd.adhd_helper.common.SecurityContextUtils;
import pl.poznan.put.adhd.adhd_helper.exceptions.InvalidResourceStateException;
import pl.poznan.put.adhd.adhd_helper.pimpus.model.ProfileDto;

@Service
@Slf4j
@AllArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;

    public ProfileDto getProfile() {
        PimpusProfile profile = getUserProfile();
        return profileMapper.toDto(profile);
    }

    @Transactional
    public ProfileDto feed(Integer times) {
        PimpusProfile profile = getUserProfile();
        validateProfileHasEnoughPoints(profile.getInventoryPoints(), times);

        addExp(profile, times);
        profile.setInventoryPoints(profile.getInventoryPoints() - times);

        return profileMapper.toDto(profile);
    }

    private void addExp(PimpusProfile profile, int baseExp) {
        int exp = getBonusExp(baseExp);

        profile.setCurrentExp(profile.getCurrentExp() + exp);

        while (profile.getCurrentExp() >= profile.getExpToNextLevel()) {
            levelUp(profile);
        }
    }

    private void levelUp(PimpusProfile profile) {
        profile.setLevel(profile.getLevel() + 1);
        profile.setCurrentExp(profile.getCurrentExp() - profile.getExpToNextLevel());
        profile.setExpToNextLevel(getNextExpToNextLevel(profile.getLevel()));
    }

    private int getBonusExp(int baseExp) {
        double roll = Math.random();

        if (roll < 0.01) {
            return baseExp * 10;
        }

        if (roll < 0.11) {
            return baseExp * 2;
        }

        return baseExp;
    }

    private int getNextExpToNextLevel(int nextLevel) {
        return (int) Math.ceil(10.0 * Math.sqrt(nextLevel));
    }

    private void validateProfileHasEnoughPoints(Integer inventoryPoints, Integer requestedPoints) {
        if (inventoryPoints < requestedPoints) {
            String message =
                    String.format(
                            "Cannot feed by %d points when you have %d points.",
                            requestedPoints, inventoryPoints);
            throw InvalidResourceStateException.of(
                    "Inventory Points", "LESS THAN REQUESTED", message);
        }
    }

    private PimpusProfile getUserProfile() {
        return profileRepository.findByUser(SecurityContextUtils.getAdhdUser());
    }
}
