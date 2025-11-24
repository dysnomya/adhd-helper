package pl.poznan.put.adhd.adhd_helper.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByCreatedBy_IdAndParentNull(String id);

    List<Task> findAllByParent(Task parent);

    boolean existsByParent(Task parent);

}
