package pl.poznan.put.adhd.adhd_helper.task.model;

import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import pl.poznan.put.adhd.adhd_helper.priority.Priority;

import java.time.LocalDate;

public record SubtaskRequest(
        @Schema(description = "Category ID assigned to the subtask", example = "12")
                Long categoryId,
        @Schema(description = "Subtask name", example = "Prepare presentation slides")
                @NotEmpty(message = "Subtask name should not be empty")
                String name,
        @Schema(description = "Date assigned to the subtask", example = "2026-01-03") LocalDate day,
        @Schema(description = "Subtask priority")
                @NotNull(message = "Subtask should have a priority")
                Priority priority,
        @Schema(description = "Time needed to complete the subtask (in minutes)", example = "30")
                @NotNull(message = "All subtasks should have needed time")
                Integer timeNeeded) {}
