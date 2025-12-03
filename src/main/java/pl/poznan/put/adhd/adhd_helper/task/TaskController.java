package pl.poznan.put.adhd.adhd_helper.task;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import pl.poznan.put.adhd.adhd_helper.task.model.TaskResponse;
import pl.poznan.put.adhd.adhd_helper.task.specification.TaskFilter;

import java.util.Collection;

@RestController
@RequestMapping(value = "/api/tasks", produces = "application/json")
@AllArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public Collection<TaskResponse> getAllTasks(@ModelAttribute TaskFilter taskFilter, Sort sort) {
        return taskService.getAllTasks(taskFilter, sort);
    }
}
