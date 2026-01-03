package pl.poznan.put.adhd.adhd_helper.task;

import com.nimbusds.oauth2.sdk.util.CollectionUtils;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Component;

import pl.poznan.put.adhd.adhd_helper.category.CategoryService;
import pl.poznan.put.adhd.adhd_helper.exceptions.ResourceNotFoundException;
import pl.poznan.put.adhd.adhd_helper.task.model.SubtaskRequest;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskRequest;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class TaskValidator {
    private final CategoryService categoryService;

    public void validateTask(TaskRequest taskRequest) {
        Set<Long> requestedCategoryIds = getIds(taskRequest.subtasks(), SubtaskRequest::categoryId);
        requestedCategoryIds.add(taskRequest.categoryId());

        Set<Long> foundCategories = categoryService.findAllById(requestedCategoryIds);
        validateIds(requestedCategoryIds, foundCategories);
    }

    private void validateIds(Set<Long> requestedIds, Set<Long> foundIds) {
        Set<Long> missingIds =
                requestedIds.stream()
                        .filter(requestedId -> !foundIds.contains(requestedId))
                        .collect(Collectors.toSet());

        if (CollectionUtils.isNotEmpty(missingIds)) {
            throw ResourceNotFoundException.multiple("Category", missingIds).get();
        }
    }

    private <T> Set<Long> getIds(List<T> items, Function<T, Long> idGetter) {
        return items.stream().map(idGetter).filter(Objects::nonNull).collect(Collectors.toSet());
    }
}
