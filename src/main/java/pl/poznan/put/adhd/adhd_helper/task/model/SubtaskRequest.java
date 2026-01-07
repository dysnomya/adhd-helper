package pl.poznan.put.adhd.adhd_helper.task.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import pl.poznan.put.adhd.adhd_helper.priority.Priority;

import java.time.LocalDate;

public record SubtaskRequest(
        Long categoryId,
        @NotEmpty(message = "Subtask name should not be empty") String name,
        LocalDate day,
        @NotNull(message = "Subtask should have a priority") Priority priority,
        @NotNull(message = "All subtasks should have needed time") Integer timeNeeded) {}
