package pl.poznan.put.adhd.adhd_helper.task.specification;

import com.nimbusds.oauth2.sdk.util.CollectionUtils;

import lombok.experimental.UtilityClass;

import org.springframework.data.jpa.domain.Specification;

import pl.poznan.put.adhd.adhd_helper.category.Category_;
import pl.poznan.put.adhd.adhd_helper.common.specification.SpecificationBuilder;
import pl.poznan.put.adhd.adhd_helper.priority.Priority;
import pl.poznan.put.adhd.adhd_helper.task.Task;
import pl.poznan.put.adhd.adhd_helper.task.Task_;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

@UtilityClass
public class TaskSpecifications {

    public static Specification<Task> getTaskSpecification(
            TaskFilter taskFilter, AdhdUser adhdUser) {

        return SpecificationBuilder.<Task>empty()
                .eq(Task_.createdBy, adhdUser)
                .isNull(Task_.parent)
                .eq(Task_.day, taskFilter.day())
                .and(categoryIn(taskFilter.category()))
                .and(priorityIn(taskFilter.priority()))
                .before(Task_.day, taskFilter.dayTo())
                .after(Task_.day, taskFilter.dayFrom())
                .build();
    }

    public static Specification<Task> categoryIn(Collection<Long> categoryIds) {
        if (categoryIds == null) return (root, query, cb) -> null;

        Specification<Task> spec = Specification.unrestricted();

        if (categoryIds.contains(null)) {
            spec =
                    spec.and(
                            (root, query, cb) ->
                                    cb.isNull(root.get(Task_.category).get(Category_.id)));
        }

        List<Long> nonNullIds = categoryIds.stream().filter(Objects::nonNull).toList();

        if (CollectionUtils.isNotEmpty(nonNullIds)) {
            spec =
                    spec.or(
                            (root, query, cb) ->
                                    root.get(Task_.category).get(Category_.id).in(nonNullIds));
        }

        return spec;
    }

    public static Specification<Task> priorityIn(Collection<Priority> priorities) {
        if (priorities == null) return (root, query, cb) -> null;

        return (root, query, cb) -> root.get(Task_.priority).in(priorities);
    }
}
