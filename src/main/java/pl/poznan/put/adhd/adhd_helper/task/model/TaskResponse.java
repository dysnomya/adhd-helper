package pl.poznan.put.adhd.adhd_helper.task.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import pl.poznan.put.adhd.adhd_helper.category.CategoryDto;
import pl.poznan.put.adhd.adhd_helper.priority.Priority;

import java.time.LocalDate;
import java.util.List;

public record TaskResponse(
        Long id,
        CategoryDto category,
        String name,
        LocalDate day,
        Priority priority,
        Integer timeNeeded,
        Integer expAmount,
        Boolean completed,
        @JsonInclude(JsonInclude.Include.NON_EMPTY) List<TaskResponse> subtasks) {}
