package com.basicmapper.machine;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MachineMapper {

    @Mapping(source = "building.id", target = "buildingId")
    MachineResponse toResponse(MachineEntity entity);

    List<MachineResponse> toResponseList(List<MachineEntity> entities);
    @Mapping(target = "building", ignore = true)
    @Mapping(target = "id", ignore = true)
    MachineEntity toEntity(MachineRequest request);

}
