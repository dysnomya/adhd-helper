package pl.poznan.put.adhd.adhd_helper.banan;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "banan_entity")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BananEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String color;

    private Integer age;

    private String password;
}
