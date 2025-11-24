package pl.poznan.put.adhd.adhd_helper.task;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.common.UserSecurityService;
import pl.poznan.put.adhd.adhd_helper.user.UserService;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserService userService;
    private final UserSecurityService userSecurityService;

    public List<TaskWithStatus> getAllParentTasksWithSubtaskStatus() {
        String currentUser = userSecurityService.getSub();
        List<Task> parentTasks = taskRepository.findByCreatedBy_IdAndParentNull(currentUser);

        return parentTasks.stream()
                .map(task -> new TaskWithStatus(task, taskRepository.existsByParent(task)))
                .toList();
    }

    public List<TaskWithStatus> getSubtasksForParent(Long parentId) {

        Task parentTask =
                taskRepository
                        .findById(parentId)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Zadanie główne o ID: "
                                                        + parentId
                                                        + " nie zostało znalezione."));

        List<Task> subtasks = taskRepository.findAllByParent(parentTask);

        return subtasks.stream().map(subtask -> new TaskWithStatus(subtask, false)).toList();
    }
}
