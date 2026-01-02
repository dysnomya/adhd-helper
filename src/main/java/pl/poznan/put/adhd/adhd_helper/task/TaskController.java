package pl.poznan.put.adhd.adhd_helper.task;

import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import pl.poznan.put.adhd.adhd_helper.task.model.TaskRequest;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskResponse;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskStatsResponse;
import pl.poznan.put.adhd.adhd_helper.task.specification.TaskFilter;

import java.time.LocalDate;
import java.util.Collection;

@RestController
@RequestMapping(value = "/api/tasks", produces = "application/json")
@AllArgsConstructor
@Tag(
        name = "Task Controller",
        description = "API for managing tasks. User can only access own tasks.")
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public Collection<TaskResponse> getAllTasks(@ModelAttribute TaskFilter taskFilter, Sort sort) {
        return taskService.getAllTasks(taskFilter, sort);
    }

    @GetMapping(path = "/stats")
    public TaskStatsResponse getTaskStats(@RequestParam LocalDate day) {
        return taskService.getTaskStatsForDay(day);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest) {
        return taskService.insertTask(taskRequest);
    }
}
