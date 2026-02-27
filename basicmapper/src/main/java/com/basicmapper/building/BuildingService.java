package com.basicmapper.building;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BuildingService {
    private final BuildingRepository buildingRepository;
    private final BuildingMapper buildingMapper;
    public BuildingResponse createBuilding(BuildingRequest request) {
        BuildingEntity entity = buildingMapper.toEntity(request);
        BuildingEntity savedEntity = buildingRepository.save(entity);
        return buildingMapper.toResponse(savedEntity);
    }

}
