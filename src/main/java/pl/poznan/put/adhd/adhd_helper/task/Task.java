package pl.poznan.put.adhd.adhd_helper.task;

import jakarta.persistence.*;

import lombok.*;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import pl.poznan.put.adhd.adhd_helper.category.Category;
import pl.poznan.put.adhd.adhd_helper.priority.Priority;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.time.LocalDate;
import java.util.List;

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
    private AdhdUser createdBy;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Task parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Task> subtasks;

    @Column(nullable = false)
    private LocalDate day;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Column(name = "time_needed")
    private Integer timeNeeded; // in minutes

    @Column(name = "exp_amount")
    private Integer expAmount;

    @Column(nullable = false)
    private boolean completed;

    @Column(name = "completed_at")
    private LocalDate completedAt;
}
