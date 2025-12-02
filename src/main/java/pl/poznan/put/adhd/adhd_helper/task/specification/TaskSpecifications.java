package pl.poznan.put.adhd.adhd_helper.task.specification;

import lombok.experimental.UtilityClass;

import org.springframework.data.jpa.domain.Specification;

import pl.poznan.put.adhd.adhd_helper.category.Category_;
import pl.poznan.put.adhd.adhd_helper.common.specification.SpecificationBuilder;
import pl.poznan.put.adhd.adhd_helper.task.Task;
import pl.poznan.put.adhd.adhd_helper.task.Task_;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

@UtilityClass
public class TaskSpecifications {

    public static Specification<Task> getTaskSpecification(
            TaskFilter taskFilter, AdhdUser adhdUser) {

        return SpecificationBuilder.<Task>empty()
                .eq(Task_.createdBy, adhdUser)
                .isNull(Task_.parent)
                .eq(Task_.day, taskFilter.day())
                .in(Task_.category, Category_.id, taskFilter.category())
                .before(Task_.day, taskFilter.dayTo())
                .after(Task_.day, taskFilter.dayFrom())
                .build();
    }
}
