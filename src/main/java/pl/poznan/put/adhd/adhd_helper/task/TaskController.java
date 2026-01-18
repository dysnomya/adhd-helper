package pl.poznan.put.adhd.adhd_helper.task;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import pl.poznan.put.adhd.adhd_helper.task.model.SubtaskRequest;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskRequest;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskResponse;
import pl.poznan.put.adhd.adhd_helper.task.model.TaskStatsResponse;
import pl.poznan.put.adhd.adhd_helper.task.specification.TaskFilter;

import java.time.LocalDate;
import java.util.Collection;

@RestController
@RequestMapping(value = "/api/tasks", produces = "application/json")
@Tag(
        name = "Tasks",
        description = "Operations related to task management. User can only access own tasks.")
@AllArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final TaskSchedulerService taskSchedulerService;

    @GetMapping
    @Operation(
            summary = "Get all tasks",
            description =
                    "Returns a list of tasks matching the provided filter and sorting options.")
    public Collection<TaskResponse> getAllTasks(@ModelAttribute TaskFilter taskFilter, Sort sort) {
        return taskService.getAllTasks(taskFilter, sort);
    }

    @GetMapping(path = "/stats")
    @Operation(
            summary = "Get task statistics for a day",
            description = "Returns aggregated task statistics for the specified day.")
    public TaskStatsResponse getTaskStats(
            @Parameter(
                            description = "Day for which task statistics should be calculated",
                            example = "2026-01-03")
                    @RequestParam
                    LocalDate day) {
        return taskService.getTaskStatsForDay(day);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Create a new task",
            description = "Creates a new task with optional subtasks.")
    public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest) {
        return taskService.insertTask(taskRequest);
    }

    @PostMapping("/{id}/subtasks")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Add a subtask to an existing task",
            description =
                    "Adds a new subtask under the task specified by its id. "
                            + "The request body must contain the subtask details (title, description, etc.). "
                            + "Returns the created subtask.")
    public TaskResponse addSubtask(
            @PathVariable Long id, @RequestBody @Valid SubtaskRequest taskRequest) {
        return taskService.addSubtask(id, taskRequest);
    }

    @PutMapping(path = "/{id}")
    @Operation(
            summary = "Update an existing task",
            description = "Updates task details and subtasks for the given task ID.")
    public TaskResponse updateTask(
            @PathVariable Long id, @RequestBody @Valid TaskRequest taskRequest) {
        return taskService.updateTask(id, taskRequest);
    }

    @DeleteMapping(path = "/{id}")
    @Operation(summary = "Delete a task", description = "Deletes the task with the given ID.")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @Operation(
            summary = "Mark task as completed",
            description = "Marks the specified task as completed.")
    @PatchMapping("/{id}/complete")
    public TaskResponse completeTask(
            @Parameter(description = "Id of the task to mark as completed", example = "42")
                    @PathVariable
                    Long id) {

        return taskService.completeTask(id);
    }

    @Operation(
            summary = "Mark task as not completed",
            description =
                    """
        Marks the specified task as not completed.
        Can only uncomplete tasks that were marked as completed today.
        If it was completed before, uncompleting is no longer possible.
        """)
    @PatchMapping("/{id}/uncomplete")
    public TaskResponse uncompleteTask(
            @Parameter(description = "Id of the task to mark as not completed", example = "42")
                    @PathVariable
                    Long id) {

        return taskService.uncompleteTask(id);
    }

    @Operation()
    @PostMapping("/complete")
    public void completeTasks() {
        taskSchedulerService.markUserTasksCompleted();
    }
}
