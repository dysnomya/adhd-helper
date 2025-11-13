package pl.poznan.put.adhd.adhd_helper.category;

import jakarta.persistence.*;
import lombok.*;
import pl.poznan.put.adhd.adhd_helper.user.User;

@Entity
@Table(name = "categories")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    private String color;
}