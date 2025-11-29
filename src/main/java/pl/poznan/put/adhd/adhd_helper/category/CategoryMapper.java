package pl.poznan.put.adhd.adhd_helper.category;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {
    CategoryDto toDto(Category category);

    List<CategoryDto> toDto(List<Category> categories);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "adhdUser", ignore = true)
    Category toEntity(CategoryDto categoryDto);
}
