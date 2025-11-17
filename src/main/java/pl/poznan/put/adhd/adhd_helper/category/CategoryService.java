package pl.poznan.put.adhd.adhd_helper.category;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.poznan.put.adhd.adhd_helper.user.UserService;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserService userService;

    public List<Category> getAllCategories() {
        String currentUserId = userService.getCurrentUserId();
        return categoryRepository.findByUserId(currentUserId);
    }

}
