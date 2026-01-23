package pl.poznan.put.adhd.adhd_helper.task.specification;

import pl.poznan.put.adhd.adhd_helper.priority.Priority;

import java.time.LocalDate;
import java.util.List;

public record TaskFilter(
        LocalDate dayFrom,
        LocalDate dayTo,
        LocalDate day,
        List<Long> category,
        List<Priority> priority,
        Boolean blocked) {}
