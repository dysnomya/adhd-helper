package pl.poznan.put.adhd.adhd_helper.banan;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BananMapper {
    BananDto toDto(BananEntity banan);

    List<BananDto> toDto(List<BananEntity> banans);

    BananEntity toEntity(BananDto bananDto);
}
