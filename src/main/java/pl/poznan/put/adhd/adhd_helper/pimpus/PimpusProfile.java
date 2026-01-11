package pl.poznan.put.adhd.adhd_helper.pimpus;

import jakarta.persistence.*;

import lombok.*;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import pl.poznan.put.adhd.adhd_helper.pimpus.boss.Boss;
import pl.poznan.put.adhd.adhd_helper.pimpus.title.Title;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

@Entity
@Table(name = "pimpus_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class PimpusProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @CreatedBy
    private AdhdUser user;

    private Integer level;

    private Integer currentExp;
    private Integer expToNextLevel;

    private Integer inventoryPoints;

    @ManyToOne
    @JoinColumn(name = "current_title_id")
    private Title currentTitle;

    @ManyToOne
    @JoinColumn(name = "current_boss_id")
    private Boss currentBoss;

    private Long currentBossHp;

    private Long bossfightAttempts;
}
