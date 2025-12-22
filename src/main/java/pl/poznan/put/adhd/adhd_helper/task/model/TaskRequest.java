package pl.poznan.put.adhd.adhd_helper.task.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import pl.poznan.put.adhd.adhd_helper.priority.Priority;

import java.time.LocalDate;
import java.util.List;

public record TaskRequest(
        Long categoryId,
        @NotBlank(message = "Subtask name should not be empty") String name,
        LocalDate day,
        @NotNull(message = "Task should have a priority") Priority priority,
        @NotNull(message = "Task should have needed time") Integer timeNeeded,
        List<@Valid SubtaskRequest> subtasks) {}
