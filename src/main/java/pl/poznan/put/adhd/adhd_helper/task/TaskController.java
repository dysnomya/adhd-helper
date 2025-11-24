package pl.poznan.put.adhd.adhd_helper.task;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping(value = "/api/tasks", produces = "application/json")
@AllArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public Collection<TaskResponse> getAllTasks() {
        return taskService.getAllTasks();
    }
}
