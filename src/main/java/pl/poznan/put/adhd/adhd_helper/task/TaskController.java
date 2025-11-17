package pl.poznan.put.adhd.adhd_helper.task;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class TaskController {

    private final TaskService taskService;

    // GET /api/tasks
    // Pobierz wszystkie zadania GŁÓWNE zalogowanego użytkownika
    @GetMapping
    public List<TaskWithStatus> getAllParentTasks() {
        return taskService.getAllParentTasksWithSubtaskStatus();
    }


    // GET /api/tasks/{parentId}/subtasks
    @GetMapping("/{parentId}/subtasks")
    public ResponseEntity<List<TaskWithStatus>> getSubtasks(@PathVariable Long parentId) {

        if (parentId == null) {
            return ResponseEntity.badRequest().build();
        }

        List<TaskWithStatus> subtasks = taskService.getSubtasksForParent(parentId);

        if (subtasks.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(subtasks);
    }

}
