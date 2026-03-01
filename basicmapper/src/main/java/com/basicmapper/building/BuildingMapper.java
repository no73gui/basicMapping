package com.basicmapper.building;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BuildingMapper {
    @Mapping(target = "routeId", ignore = true)
    BuildingResponse toResponse(BuildingEntity entity);
    
    @Mapping(target = "buildingId", ignore = true)
    @Mapping(target = "route", ignore = true)
    @Mapping(target = "machines", ignore = true)
    BuildingEntity toEntity(BuildingRequest request);

    List<BuildingResponse> toResponseList(List<BuildingEntity> entities);
}
