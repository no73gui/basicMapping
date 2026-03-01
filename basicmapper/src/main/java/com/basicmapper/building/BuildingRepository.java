package com.basicmapper.building;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildingRepository extends JpaRepository<BuildingEntity, Long> {
    List<BuildingEntity> findByRouteId(Long routeId);
}
