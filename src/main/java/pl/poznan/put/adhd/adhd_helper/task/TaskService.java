package pl.poznan.put.adhd.adhd_helper.task;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.task.model.TaskRequest;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskResponse;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskStatsResponse;
import pl.poznan.put.adhd.adhd_helper.task.specification.TaskFilter;
import pl.poznan.put.adhd.adhd_helper.task.specification.TaskSpecifications;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUserService;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

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

    public TaskStatsResponse getTaskStatsForDay(LocalDate day) {
        AdhdUser currentAdhdUser = adhdUserService.getCurrentUser();
        List<Task> taskOnDay =
                taskRepository.findByCreatedByAndDay(currentAdhdUser, day);

        return new TaskStatsResponse(
                day,
                taskOnDay.stream().filter(Task::getCompleted).toList().size(),
                taskOnDay.size());
    }

    public TaskResponse insertTask(TaskRequest taskRequest) {
        Task toSave = taskMapper.toEntity(taskRequest);
        toSave.setCompleted(false);
        Task task = taskRepository.save(toSave);
        return taskMapper.toResponse(task);
    }
}
