package pl.poznan.put.adhd.adhd_helper.category;

import org.mapstruct.*;

import pl.poznan.put.adhd.adhd_helper.category.model.CategoryRequest;
import pl.poznan.put.adhd.adhd_helper.category.model.CategoryResponse;

import java.util.List;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {
    CategoryResponse toResponse(Category category);

    List<CategoryResponse> toResponse(List<Category> categories);

    Category toEntity(CategoryRequest categoryRequest);

    Category toEntity(Long id);
}
