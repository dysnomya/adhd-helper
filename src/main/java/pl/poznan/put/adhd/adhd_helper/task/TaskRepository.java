package pl.poznan.put.adhd.adhd_helper.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.poznan.put.adhd.adhd_helper.user.User;

import java.util.List;

@Repository
interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUser(User user);

    List<Task> findAllByUserAndParentIsNull(User user);

    List<Task> findAllByParent(Task parent);

    boolean existsByParent(Task parent);

}
