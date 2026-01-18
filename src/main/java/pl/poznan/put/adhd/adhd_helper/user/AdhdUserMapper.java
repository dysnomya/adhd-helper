package pl.poznan.put.adhd.adhd_helper.user;

import org.mapstruct.*;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AdhdUserMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    AdhdUser updateUserFromToken(AdhdUserToken token, @MappingTarget AdhdUser entity);
}
