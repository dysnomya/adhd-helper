package pl.poznan.put.adhd.adhd_helper.task;

import org.mapstruct.*;

import pl.poznan.put.adhd.adhd_helper.category.CategoryMapper;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskRequest;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskResponse;

import java.util.Collection;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = CategoryMapper.class)
interface TaskMapper {
    @Mapping(target = "category", source = "categoryId")
    void update(TaskRequest taskRequest, @MappingTarget Task task);

    @Mapping(target = "category", source = "categoryId")
    Task toEntity(TaskRequest taskRequest);

    TaskResponse toResponse(Task task);

    Collection<TaskResponse> toResponse(Collection<Task> tasks);
}
