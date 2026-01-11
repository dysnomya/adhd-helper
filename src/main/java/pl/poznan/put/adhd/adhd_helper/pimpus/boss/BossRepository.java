package pl.poznan.put.adhd.adhd_helper.pimpus.boss;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BossRepository extends JpaRepository<Boss, Long> {

    Optional<Boss> findTopByBossLevelGreaterThan(Integer bossLevelIsGreaterThan);
}
