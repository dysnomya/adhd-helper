package pl.poznan.put.adhd.adhd_helper.task.model;

import java.time.LocalDate;

public record TaskStatsResponse(LocalDate day, long completed, long total) {}
