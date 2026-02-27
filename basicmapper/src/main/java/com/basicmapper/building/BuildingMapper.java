package com.basicmapper.building;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BuildingMapper {
    @Mapping(target = "routeId", ignore = true)
    BuildingResponse toResponse(BuildingEntity entity);
    
    @Mapping(target = "route", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "machines", ignore = true)
    BuildingEntity toEntity(BuildingRequest request);
}
