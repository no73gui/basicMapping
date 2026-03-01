package com.basicmapper.route;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RouteMapper {

    RouteResponse toResponse(RouteEntity entity);
    List<RouteResponse> toResponseList(List<RouteEntity> entities);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "employees", ignore = true)
    @Mapping(target = "buildings", ignore = true)
    RouteEntity toEntity(RouteRequest request);
}