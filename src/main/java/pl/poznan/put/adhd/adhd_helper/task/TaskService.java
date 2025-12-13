package pl.poznan.put.adhd.adhd_helper.task;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.task.model.TaskResponse;
import pl.poznan.put.adhd.adhd_helper.task.specification.TaskFilter;
import pl.poznan.put.adhd.adhd_helper.task.specification.TaskSpecifications;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUserService;

import java.util.Collection;

@Service
@Slf4j
@AllArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final AdhdUserService adhdUserService;

    public Collection<TaskResponse> getAllTasks(TaskFilter taskFilter, Sort sort) {

        AdhdUser currentAdhdUser = adhdUserService.getCurrentUser();
        Collection<Task> parentTasks =
                taskRepository.findAll(
                        TaskSpecifications.getTaskSpecification(taskFilter, currentAdhdUser), sort);

        return taskMapper.toResponse(parentTasks);
    }
}
