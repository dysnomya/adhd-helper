package pl.poznan.put.adhd.adhd_helper.task;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import pl.poznan.put.adhd.adhd_helper.common.UserSecurityService;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.util.Collection;

@Service
@AllArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserSecurityService userSecurityService;
    private final TaskMapper taskMapper;

    public Collection<TaskResponse> getAllTasks() {
        AdhdUser currentAdhdUser = userSecurityService.getUser();
        Collection<Task> parentTasks = taskRepository.findByCreatedByAndParentNull(currentAdhdUser);

        return taskMapper.toResponse(parentTasks);
    }
}
