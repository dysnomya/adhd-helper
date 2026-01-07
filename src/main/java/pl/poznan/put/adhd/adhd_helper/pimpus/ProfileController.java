package pl.poznan.put.adhd.adhd_helper.pimpus;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.constraints.Min;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.*;

import pl.poznan.put.adhd.adhd_helper.pimpus.model.ProfileDto;

@RestController
@RequestMapping(value = "/api/profile", produces = "application/json")
@Tag(
        name = "Pimpuś Profile",
        description = "Operations related to gamification. User can only access own profile.")
@AllArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping
    @Operation(
            summary = "Get Pimpuś profile",
            description =
                    "Returns current user's Pimpuś profile including level, EXP, inventory points and boss progress.")
    public ProfileDto getProfile() {
        return profileService.getProfile();
    }

    @PostMapping("/feed/{amount}")
    @Operation(
            summary = "Feed Pimpuś",
            description =
                    """
            Feeds Pimpuś with given amount of food.
            Feeding consumes inventory points and grants EXP.
            There is a chance for bonus EXP (2x or 10x).
            Can result in one or multiple level-ups.
            """,
            parameters = {
                @Parameter(
                        name = "amount",
                        description = "Amount of food to feed Pimpuś (e.g. 1 or 10)",
                        example = "1",
                        required = true)
            })
    public ProfileDto feedPimpus(
            @PathVariable @Min(value = 1, message = "Cannot give less than 1 food") int amount) {
        return profileService.feed(amount);
    }
}
