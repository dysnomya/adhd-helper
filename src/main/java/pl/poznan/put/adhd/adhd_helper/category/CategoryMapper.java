package pl.poznan.put.adhd.adhd_helper.category;

import org.mapstruct.*;

import pl.poznan.put.adhd.adhd_helper.category.model.CategoryRequest;

import java.util.List;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {
    CategoryRequest toDto(Category category);

    List<CategoryRequest> toDto(List<Category> categories);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "adhdUser", ignore = true)
    Category toEntity(CategoryRequest categoryRequest);

    Category toEntity(Long id);
}
