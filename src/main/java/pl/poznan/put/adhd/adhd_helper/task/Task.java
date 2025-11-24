package pl.poznan.put.adhd.adhd_helper.task;

import jakarta.persistence.*;

import lombok.*;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import pl.poznan.put.adhd.adhd_helper.category.Category;
import pl.poznan.put.adhd.adhd_helper.user.User;

import java.util.Date;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @CreatedBy
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Task parent;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Date day;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Column(name = "time_needed")
    private Integer timeNeeded;

    @Column(name = "exp_amount")
    private Integer expAmount;

    @Column(nullable = false)
    private Boolean completed;
}
