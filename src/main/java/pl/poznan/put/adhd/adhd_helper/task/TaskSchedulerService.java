package pl.poznan.put.adhd.adhd_helper.task;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pl.poznan.put.adhd.adhd_helper.common.SecurityContextUtils;
import pl.poznan.put.adhd.adhd_helper.pimpus.PimpusProfile;
import pl.poznan.put.adhd.adhd_helper.pimpus.ProfileService;
import pl.poznan.put.adhd.adhd_helper.user.AdhdUser;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskSchedulerService {
    private final TaskRepository taskRepository;
    private final ProfileService profileService;

    @Scheduled(cron = "0 0 0 * * ?", zone = "Europe/Warsaw")
    @Transactional
    public void markAllTasksCompleted() {
        List<Task> tasks = taskRepository.findByCompletedTrueAndBlockedFalse();
        markAllTasksCompleted(tasks);
    }

    @Transactional
    public void markUserTasksCompleted() {
        List<Task> tasks =
                taskRepository.findByCreatedByAndCompletedTrueAndBlockedFalse(
                        SecurityContextUtils.getAdhdUser());
        markAllTasksCompleted(tasks);
    }

    @Transactional
    public void markAllTasksCompleted(List<Task> tasks) {
        Set<AdhdUser> users = tasks.stream().map(Task::getCreatedBy).collect(Collectors.toSet());
        Map<AdhdUser, PimpusProfile> profileMap = profileService.getUserProfileMap(users);
        tasks.forEach(task -> fullyCompleteTask(profileMap.get(task.getCreatedBy()), task));
    }

    private void fullyCompleteTask(PimpusProfile profile, Task task) {
        task.setBlocked(true);
        profile.setBossfightAttempts(profile.getBossfightAttempts() + 1L);
        profile.setInventoryPoints(
                profile.getInventoryPoints()
                        + calculateInventoryPoints(
                                task.getCompletedAt().isBefore(task.getDay()),
                                task.getTimeNeeded(),
                                task.getSubtasks().size()));
    }

    private int calculateInventoryPoints(
            boolean isCompletedBeforeDay, Integer timeNeededToCompleteTask, int subtasks) {
        int baseTimePoints = subtasks == 0 ? Math.min(timeNeededToCompleteTask, 100) : subtasks;
        double pointsWithTimeBonus = isCompletedBeforeDay ? baseTimePoints * 1.5 : baseTimePoints;

        log.error("Added points: {}", pointsWithTimeBonus);

        return (int) Math.ceil(pointsWithTimeBonus);
    }
}
