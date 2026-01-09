package pl.poznan.put.adhd.adhd_helper.category.model;

import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CategoryRequest(
        @Schema(description = "Category id", example = "1")
            Long id,
        @Schema(description = "Category name", example = "Work")
                @NotEmpty(message = "Category name should not be empty")
                String name,
        @Schema(description = "Category color (used for UI display)", example = "#FF9800")
                @NotNull(message = "Category color should not be null")
                String color) {}
