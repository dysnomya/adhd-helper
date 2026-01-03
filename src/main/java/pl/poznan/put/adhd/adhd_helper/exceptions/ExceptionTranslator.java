package pl.poznan.put.adhd.adhd_helper.exceptions;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;

@Component
public class ExceptionTranslator {

    public ApiError translate(MethodArgumentNotValidException ex) {
        return ApiError.builder()
                .status(HttpStatus.BAD_REQUEST)
                .message(ex.getBody().getDetail())
                .details(
                        ex.getBindingResult().getAllErrors().stream()
                                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                                .toList())
                .build();
    }

    public ApiError translate(HttpMessageNotReadableException ex) {
        return ApiError.builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("Http message not readable.")
                .build();
    }

    public ApiError translate(ResourceNotFoundException ex) {
        return ApiError.builder()
                .status(HttpStatus.NOT_FOUND)
                .message(ex.getMessage())
                .details(ex.getResources())
                .build();
    }

    public ApiError translate(InvalidResourceStateException ex) {
        return ApiError.builder()
                .status(HttpStatus.BAD_REQUEST)
                .message(ex.getMessage())
                .details(List.of("Resource: " + ex.getResource(), "State: " + ex.getState()))
                .build();
    }

    public ApiError translate(Exception ex) {
        return ApiError.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .message("Server Error")
                .build();
    }
}
