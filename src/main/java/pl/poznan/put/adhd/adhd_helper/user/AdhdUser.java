package pl.poznan.put.adhd.adhd_helper.user;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdhdUser {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    private String googleId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;
}
