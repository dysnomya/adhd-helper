package pl.poznan.put.adhd.adhd_helper.banan;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BananService {

    private final BananRepository bananRepository;
    private final BananMapper bananMapper;

    public List<BananDto> getAllBanans() {
        List<BananEntity> banans = bananRepository.findAll();
        return bananMapper.toDto(banans);
    }

    public BananEntity getBananById(Integer id) {
        return bananRepository.findById(id).orElse(null);
    }

    public BananDto insertBanan(BananDto bananDto) {
        BananEntity bananEntity = bananMapper.toEntity(bananDto);
        return bananMapper.toDto(bananRepository.save(bananEntity));
    }

    public void  deleteBanan(Integer id) {
        bananRepository.deleteById(id);
    }
}
