package pl.poznan.put.adhd.adhd_helper.category;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.user.AdhdUserService;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final AdhdUserService adhdUserService;

    public List<CategoryDto> getAllCategories() {
        List<Category> allCategories =
                categoryRepository.findAllByAdhdUser(adhdUserService.getCurrentUser());
        return categoryMapper.toDto(allCategories);
    }

    public CategoryDto addCategory(CategoryDto categoryDto) {
        Category category = categoryMapper.toEntity(categoryDto);
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toDto(savedCategory);
    }
}
