package pl.poznan.put.adhd.adhd_helper.category;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pl.poznan.put.adhd.adhd_helper.category.model.CategoryRequest;
import pl.poznan.put.adhd.adhd_helper.common.SecurityContextUtils;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryRequest> getAllCategories() {
        List<Category> allCategories =
                categoryRepository.findByAdhdUser(SecurityContextUtils.getAdhdUser());
        return categoryMapper.toDto(allCategories);
    }

    public Set<Long> findAllById(Set<Long> requestedCategoryIds) {
        return categoryRepository
                .findByAdhdUserAndIdIn(SecurityContextUtils.getAdhdUser(), requestedCategoryIds)
                .stream()
                .map(Category::getId)
                .collect(Collectors.toSet());
    }

    @Transactional
    public CategoryRequest addCategory(CategoryRequest categoryRequest) {
        Category category = categoryMapper.toEntity(categoryRequest);
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toDto(savedCategory);
    }
}
