package pl.poznan.put.adhd.adhd_helper.task;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.common.SecurityContextUtils;
import pl.poznan.put.adhd.adhd_helper.exceptions.ResourceNotFoundException;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskRequest;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskResponse;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskStatsResponse;
import pl.poznan.put.adhd.adhd_helper.task.specification.TaskFilter;
import pl.poznan.put.adhd.adhd_helper.task.specification.TaskSpecifications;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final TaskValidator taskValidator;

    public Collection<TaskResponse> getAllTasks(TaskFilter taskFilter, Sort sort) {
        Collection<Task> parentTasks =
                taskRepository.findAll(TaskSpecifications.getTaskSpecification(taskFilter), sort);

        return taskMapper.toResponse(parentTasks);
    }

    public TaskStatsResponse getTaskStatsForDay(LocalDate day) {
        List<Task> taskOnDay =
                taskRepository.findByDayAndParentNullAndCreatedBy(
                        day, SecurityContextUtils.getAdhdUser());

        return new TaskStatsResponse(
                day,
                taskOnDay.stream().filter(Task::isCompleted).toList().size(),
                taskOnDay.size());
    }

    public TaskResponse insertTask(TaskRequest taskRequest) {
        taskValidator.validateTask(taskRequest);

        Task toSave = taskMapper.toEntity(taskRequest);
        Task task = taskRepository.save(toSave);
        return taskMapper.toResponse(task);
    }

    public TaskResponse updateTask(Long id, TaskRequest taskRequest) {
        Task toUpdate = getTaskById(id);
        taskValidator.validateTask(taskRequest);

        taskMapper.update(taskRequest, toUpdate);
        Task task = taskRepository.save(toUpdate);
        return taskMapper.toResponse(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteByIdAndCreatedBy(id, SecurityContextUtils.getAdhdUser());
    }

    private Task getTaskById(Long id) {
        return taskRepository
                .findByIdAndCreatedBy(id, SecurityContextUtils.getAdhdUser())
                .orElseThrow(ResourceNotFoundException.single("Task", id));
    }
}
