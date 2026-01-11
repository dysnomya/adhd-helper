package pl.poznan.put.adhd.adhd_helper.pimpus;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pl.poznan.put.adhd.adhd_helper.common.SecurityContextUtils;
import pl.poznan.put.adhd.adhd_helper.exceptions.InvalidResourceStateException;
import pl.poznan.put.adhd.adhd_helper.pimpus.boss.Boss;
import pl.poznan.put.adhd.adhd_helper.pimpus.boss.BossRepository;
import pl.poznan.put.adhd.adhd_helper.pimpus.model.BossfightDto;
import pl.poznan.put.adhd.adhd_helper.pimpus.model.ProfileDto;

@Service
@Slf4j
@AllArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;
    private final BossRepository bossRepository;

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

    @Transactional
    public BossfightDto fightBoss() {
        PimpusProfile profile = getUserProfile();
        validateProfileHasFightAttempt(profile);

        int damageDealt = dealDamage(profile);
        return new BossfightDto(profileMapper.toDto(profile), damageDealt);
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
        profile.setExpToNextLevel(calculateExpToNextLevel(profile.getLevel()));
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

    private int calculateExpToNextLevel(int nextLevel) {
        return (int) Math.ceil(10.0 * Math.sqrt(nextLevel));
    }

    private int dealDamage(PimpusProfile profile) {
        int damage = calculateDamageForAttack(profile.getLevel());
        profile.setCurrentBossHp(profile.getCurrentBossHp() - damage);
        profile.setBossfightAttempts(profile.getBossfightAttempts() - 1);

        if (profile.getCurrentBossHp() <= 0) {
            profile.setCurrentTitle(profile.getCurrentBoss().getRewardTitle());
            Boss boss = setNextBoss(profile);
            profile.setCurrentBossHp(boss.getMaxHp());
        }

        return damage;
    }

    private Boss setNextBoss(PimpusProfile profile) {
        Integer currentBossLevel = profile.getCurrentBoss().getBossLevel();
        Boss nextBoss = bossRepository.findTopByBossLevelGreaterThan(currentBossLevel).orElse(null);
        profile.setCurrentBoss(nextBoss);

        return nextBoss;
    }

    private int calculateDamageForAttack(Integer level) {
        double baseDamage = Math.pow(1.2, level);
        double roll = Math.random(); // (0, 1)
        double damageMultiplier = roll + 0.5; // (0.5, 1.5)

        return (int) Math.ceil(baseDamage * damageMultiplier);
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

    private void validateProfileHasFightAttempt(PimpusProfile profile) {
        if (profile.getBossfightAttempts() < 1) {
            throw InvalidResourceStateException.of(
                    "Bossfight Attempts", "LESS THAN REQUIRED", "You don't have bossfight attempt");
        }
    }

    private PimpusProfile getUserProfile() {
        return profileRepository.findByUser(SecurityContextUtils.getAdhdUser());
    }
}
