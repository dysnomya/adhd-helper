package pl.poznan.put.adhd.adhd_helper.task;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.time.LocalDate;
import java.util.List;

@Repository
interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {

    @EntityGraph(attributePaths = {"category", "subtasks"})
    @NonNull
    @Override
    List<Task> findAll(Specification<Task> specification, @NonNull Sort sort);

    List<Task> findByCreatedByAndDay(AdhdUser createdBy, LocalDate day);
}
