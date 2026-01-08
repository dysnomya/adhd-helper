package pl.poznan.put.adhd.adhd_helper.pimpus;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import pl.poznan.put.adhd.adhd_helper.pimpus.model.ProfileDto;
import pl.poznan.put.adhd.adhd_helper.pimpus.title.Title;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProfileMapper {
    ProfileDto toDto(PimpusProfile profile);

    default String map(Title title) {
        return title == null ? null : title.getName();
    }
}
