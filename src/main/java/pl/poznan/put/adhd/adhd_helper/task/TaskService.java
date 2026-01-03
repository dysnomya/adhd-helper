package pl.poznan.put.adhd.adhd_helper.task;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pl.poznan.put.adhd.adhd_helper.common.SecurityContextUtils;
import pl.poznan.put.adhd.adhd_helper.exceptions.InvalidResourceStateException;
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

    @Transactional
    public TaskResponse insertTask(TaskRequest taskRequest) {
        taskValidator.validateTask(taskRequest);

        Task toSave = taskMapper.toEntity(taskRequest);
        Task task = taskRepository.save(toSave);
        return taskMapper.toResponse(task);
    }

    @Transactional
    public TaskResponse updateTask(Long id, TaskRequest taskRequest) {
        Task toUpdate = getTaskById(id);
        taskValidator.validateTask(taskRequest);

        taskMapper.update(taskRequest, toUpdate);
        Task task = taskRepository.save(toUpdate);
        return taskMapper.toResponse(task);
    }

    @Transactional
    public void deleteTask(Long id) {
        long deleted =
                taskRepository.deleteByIdAndCreatedBy(id, SecurityContextUtils.getAdhdUser());

        if (deleted == 0) {
            throw ResourceNotFoundException.single("Task", id).get();
        }
    }

    @Transactional
    public TaskResponse completeTask(Long id) {
        Task toComplete = getTaskById(id);
        validateTaskIsUncompleted(toComplete);

        toComplete.setCompleted(true);
        toComplete.setCompletedAt(LocalDate.now());
        return taskMapper.toResponse(toComplete);
    }

    @Transactional
    public TaskResponse uncompleteTask(Long id) {
        Task toUncomplete = getTaskById(id);
        validateTaskIsCompletedToday(toUncomplete);

        toUncomplete.setCompleted(false);
        toUncomplete.setCompletedAt(null);
        return taskMapper.toResponse(toUncomplete);
    }

    private Task getTaskById(Long id) {
        return taskRepository
                .findByIdAndCreatedBy(id, SecurityContextUtils.getAdhdUser())
                .orElseThrow(ResourceNotFoundException.single("Task", id));
    }

    private void validateTaskIsUncompleted(Task task) {
        if (task.isCompleted()) {
            throw InvalidResourceStateException.of(
                    "Task", "COMPLETED", "Task with id " + task.getId() + " is already completed");
        }
    }

    private void validateTaskIsCompletedToday(Task task) {
        if (!task.isCompleted()) {
            return; // uncompleting uncompleted task won't hurt
        }

        if (task.getCompletedAt().isBefore(LocalDate.now())) {
            throw InvalidResourceStateException.of(
                    "Task",
                    "COMPLETED_TODAY",
                    "Task with id " + task.getId() + " is not completed today.");
        }
    }
}
