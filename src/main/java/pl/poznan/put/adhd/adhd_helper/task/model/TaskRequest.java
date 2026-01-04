package pl.poznan.put.adhd.adhd_helper.task.model;

import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import pl.poznan.put.adhd.adhd_helper.priority.Priority;

import java.time.LocalDate;
import java.util.List;

public record TaskRequest(
        @Schema(description = "Category id assigned to the task", example = "1") Long categoryId,
        @Schema(description = "Task name", example = "Finish writing new java app")
                @NotBlank(message = "Task name should not be empty")
                String name,
        @Schema(description = "Task date", example = "2026-01-29") LocalDate day,
        @Schema(description = "Task priority") @NotNull(message = "Task should have a priority")
                Priority priority,
        @Schema(description = "Time needed to complete the task in minutes", example = "30")
                @NotNull(message = "Task should have needed time")
                Integer timeNeeded,
        @Schema(description = "Optional list of subtasks") List<@Valid SubtaskRequest> subtasks) {}
