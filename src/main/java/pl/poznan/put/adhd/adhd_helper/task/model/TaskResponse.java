package pl.poznan.put.adhd.adhd_helper.task.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;

import pl.poznan.put.adhd.adhd_helper.category.model.CategoryRequest;
import pl.poznan.put.adhd.adhd_helper.priority.Priority;

import java.time.LocalDate;
import java.util.List;

@Builder
public record TaskResponse(
        Long id,
        CategoryRequest category,
        String name,
        LocalDate day,
        Priority priority,
        Integer timeNeeded,
        Boolean completed,
        Boolean blocked,
        LocalDate completedAt,
        @JsonInclude(JsonInclude.Include.NON_EMPTY) List<TaskResponse> subtasks) {}
