package pl.poznan.put.adhd.adhd_helper.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.util.Collection;

@Repository
interface TaskRepository extends JpaRepository<Task, Long> {
    Collection<Task> findByCreatedByAndParentNull(AdhdUser adhdUser);
}
