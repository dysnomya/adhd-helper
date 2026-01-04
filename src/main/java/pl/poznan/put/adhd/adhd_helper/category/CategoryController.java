package pl.poznan.put.adhd.adhd_helper.category;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import pl.poznan.put.adhd.adhd_helper.category.model.CategoryRequest;
import pl.poznan.put.adhd.adhd_helper.category.model.CategoryResponse;

import java.util.List;

@RestController
@RequestMapping(value = "/api/categories", produces = "application/json")
@Tag(
        name = "Categories",
        description = "Operations related to task categories. User can only access own categories.")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    @Operation(
            summary = "Get all categories",
            description = "Returns a list of all available task categories for user.")
    public List<CategoryResponse> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    @Operation(summary = "Create a new category", description = "Creates a new task category.")
    public CategoryResponse addCategory(@RequestBody @Valid CategoryRequest categoryRequest) {
        return categoryService.addCategory(categoryRequest);
    }

    @PutMapping("/categories/{id}")
    @Operation(
            summary = "Update a category",
            description =
                    "Updates the specified category's name or color. Only categories belonging to the current user can be updated.")
    public CategoryResponse updateCategory(
            @Parameter(description = "ID of the category to update", example = "5") @PathVariable
                    Long id,
            @RequestBody @Valid CategoryRequest categoryRequest) {

        return categoryService.updateCategory(id, categoryRequest);
    }

    @DeleteMapping("/categories/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            summary = "Delete a category",
            description =
                    "Deletes the specified category. Only categories belonging to the current user can be deleted.")
    public void deleteCategory(
            @Parameter(description = "ID of the category to delete", example = "5") @PathVariable
                    Long id) {

        categoryService.deleteCategory(id);
    }
}
