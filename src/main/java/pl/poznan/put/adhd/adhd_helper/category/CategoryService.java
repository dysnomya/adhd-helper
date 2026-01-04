package pl.poznan.put.adhd.adhd_helper.category;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pl.poznan.put.adhd.adhd_helper.category.model.CategoryRequest;
import pl.poznan.put.adhd.adhd_helper.category.model.CategoryResponse;
import pl.poznan.put.adhd.adhd_helper.common.SecurityContextUtils;
import pl.poznan.put.adhd.adhd_helper.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryResponse> getAllCategories() {
        List<Category> allCategories =
                categoryRepository.findByAdhdUser(SecurityContextUtils.getAdhdUser());
        return categoryMapper.toResponse(allCategories);
    }

    public Set<Long> findAllById(Set<Long> requestedCategoryIds) {
        return categoryRepository
                .findByAdhdUserAndIdIn(SecurityContextUtils.getAdhdUser(), requestedCategoryIds)
                .stream()
                .map(Category::getId)
                .collect(Collectors.toSet());
    }

    @Transactional
    public CategoryResponse addCategory(CategoryRequest categoryRequest) {
        Category category = categoryMapper.toEntity(categoryRequest);
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toResponse(savedCategory);
    }

    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest categoryRequest) {
        Category category = getCategoryById(id);
        categoryMapper.update(categoryRequest, category);

        categoryRepository.save(category);
        return categoryMapper.toResponse(category);
    }

    @Transactional
    public void deleteCategory(Long id) {
        long deleted =
                categoryRepository.deleteByIdAndAdhdUser(id, SecurityContextUtils.getAdhdUser());

        if (deleted == 0) {
            throw ResourceNotFoundException.single("Category", id).get();
        }
    }

    private Category getCategoryById(Long id) {
        return categoryRepository
                .findByIdAndAdhdUser(id, SecurityContextUtils.getAdhdUser())
                .orElseThrow(ResourceNotFoundException.single("Category", id));
    }
}
