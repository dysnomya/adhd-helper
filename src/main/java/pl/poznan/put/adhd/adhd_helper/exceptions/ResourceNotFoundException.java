package pl.poznan.put.adhd.adhd_helper.exceptions;

import lombok.Getter;

import java.util.Collection;
import java.util.List;
import java.util.function.Supplier;

@Getter
public class ResourceNotFoundException extends RuntimeException {

    private final List<String> resources;

    private ResourceNotFoundException(String message, List<String> resources) {
        super(message);
        this.resources = resources;
    }

    public static Supplier<ResourceNotFoundException> single(
            String resourceName, Object identifier) {
        String message = String.format("%s not found with id: %s", resourceName, identifier);

        return () -> new ResourceNotFoundException(message, List.of(message));
    }

    public static Supplier<ResourceNotFoundException> multiple(
            String resourceName, Collection<?> identifiers) {
        String message = String.format("%s not found for ids: %s", resourceName, identifiers);

        List<String> details =
                identifiers.stream().map(id -> resourceName + " not found with id: " + id).toList();

        return () -> new ResourceNotFoundException(message, details);
    }
}
