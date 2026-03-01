package com.basicmapper.machine;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MachineMapper {

    @Mapping(target = "buildingId", ignore = true)
    MachineResponse toResponse(MachineEntity entity);

    List<MachineResponse> toResponseList(List<MachineEntity> entities);
    @Mapping(target = "building", ignore = true)
    @Mapping(target = "id", ignore = true)
    MachineEntity toEntity(MachineRequest request);

}
