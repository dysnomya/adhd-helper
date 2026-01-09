package pl.poznan.put.adhd.adhd_helper.pimpus.boss;

import jakarta.persistence.*;

import lombok.*;

import pl.poznan.put.adhd.adhd_helper.pimpus.title.Title;

@Entity
@Table(name = "boss")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Boss {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer requiredLevel;

    private Integer colorHueRotate;

    @OneToOne
    @JoinColumn(name = "reward_title_id")
    private Title rewardTitle;
}
