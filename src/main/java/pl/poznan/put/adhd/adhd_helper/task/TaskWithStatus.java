package pl.poznan.put.adhd.adhd_helper.task;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class TaskWithStatus {

    private Long id;
    private String userId;
    private Long categoryId;
    private Long parentId;

    private String name;
    private Date day;
    private String priority;
    private Integer timeNeeded;
    private Integer expAmount;
    private Boolean completed;

    private boolean hasSubtasks;

    public TaskWithStatus(Task task, boolean hasSubtasks) {
        this.id = task.getId();
        //        this.userId = task.getUser().getId();
        this.categoryId = task.getCategory() != null ? task.getCategory().getId() : null;
        this.parentId = task.getParent() != null ? task.getParent().getId() : null;

        this.name = task.getName();
        this.day = task.getDay();
        this.priority = task.getPriority().name();
        this.timeNeeded = task.getTimeNeeded();
        this.expAmount = task.getExpAmount();
        this.completed = task.getCompleted();

        this.hasSubtasks = hasSubtasks;
    }
}
