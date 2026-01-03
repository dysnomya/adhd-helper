package pl.poznan.put.adhd.adhd_helper.category;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.*;

import pl.poznan.put.adhd.adhd_helper.category.model.CategoryRequest;

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
    public List<CategoryRequest> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    @Operation(summary = "Create a new category", description = "Creates a new task category.")
    public CategoryRequest addCategory(@RequestBody CategoryRequest categoryRequest) {
        return categoryService.addCategory(categoryRequest);
    }
}
