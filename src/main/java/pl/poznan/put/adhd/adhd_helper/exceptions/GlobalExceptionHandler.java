package pl.poznan.put.adhd.adhd_helper.exceptions;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
@Slf4j
@RequiredArgsConstructor
public class GlobalExceptionHandler {
    private final ExceptionTranslator exceptionTranslator;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiError handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        log.error(ex.getMessage(), ex);
        return exceptionTranslator.translate(ex);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ApiError handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        return exceptionTranslator.translate(ex);
    }

    @ExceptionHandler(Exception.class)
    public ApiError handleException(Exception ex) {
        log.error(ex.getMessage(), ex);
        return exceptionTranslator.translate(ex);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ApiError handleNotFound(ResourceNotFoundException ex) {
        log.error(ex.getMessage(), ex);
        return exceptionTranslator.translate(ex);
    }
}
