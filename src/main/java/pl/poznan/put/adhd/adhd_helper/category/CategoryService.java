package pl.poznan.put.adhd.adhd_helper.category;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.common.UserSecurityService;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final UserSecurityService userSecurityService;

    public List<CategoryDto> getAllCategories() {
        List<Category> allCategories =
                categoryRepository.findAllByAdhdUser(userSecurityService.getUser());
        return categoryMapper.toDto(allCategories);
    }

    public CategoryDto addCategory(CategoryDto categoryDto) {
        AdhdUser currentUser = userSecurityService.getUser();
        Category category = categoryMapper.toEntity(categoryDto);
        category.setAdhdUser(currentUser);
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toDto(savedCategory);
    }
}
