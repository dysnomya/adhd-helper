package pl.poznan.put.adhd.adhd_helper.exceptions;

import lombok.Getter;

@Getter
public class InvalidResourceStateException extends RuntimeException {
    private final String resource;
    private final String state;

    private InvalidResourceStateException(String resource, String state, String message) {
        super(message);
        this.resource = resource;
        this.state = state;
    }

    public static InvalidResourceStateException of(String resource, String state, String message) {

        return new InvalidResourceStateException(resource, state, message);
    }
}
