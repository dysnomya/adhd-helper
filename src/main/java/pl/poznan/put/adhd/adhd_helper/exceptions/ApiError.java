package pl.poznan.put.adhd.adhd_helper.exceptions;

import lombok.Builder;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record ApiError(
        LocalDateTime timestamp, HttpStatus status, String message, List<String> details) {
    public ApiError {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
}
