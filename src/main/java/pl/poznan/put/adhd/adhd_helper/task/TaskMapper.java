package pl.poznan.put.adhd.adhd_helper.task;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import pl.poznan.put.adhd.adhd_helper.category.CategoryMapper;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskResponse;

import java.util.Collection;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = CategoryMapper.class)
interface TaskMapper {

    Collection<TaskResponse> toResponse(Collection<Task> tasks);
}
