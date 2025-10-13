package pl.poznan.put.adhd.adhd_helper.banan;

import jakarta.annotation.security.PermitAll;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/banans")
public class BananController {

    private final BananService bananService;

    @GetMapping
    public List<BananDto> getBanan() {
        return bananService.getAllBanans();
    }

    @GetMapping("/{id}")
    public BananEntity getBananById(@PathVariable Integer id) {
        return bananService.getBananById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BananDto createBanan(@RequestBody BananDto bananDto) {
        return bananService.insertBanan(bananDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBananById(@PathVariable Integer id) {
        bananService.deleteBanan(id);
    }

}
