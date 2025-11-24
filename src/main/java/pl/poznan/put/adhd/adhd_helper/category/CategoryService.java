package pl.poznan.put.adhd.adhd_helper.category;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.common.UserSecurityService;

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
}
