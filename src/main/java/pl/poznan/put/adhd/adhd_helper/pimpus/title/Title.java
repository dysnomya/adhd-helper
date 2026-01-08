package pl.poznan.put.adhd.adhd_helper.pimpus.title;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "title")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Title {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}
