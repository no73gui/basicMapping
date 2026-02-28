package com.basicmapper.building;

import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.basicmapper.route.RouteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BuildingService {
    
    
    private final BuildingRepository buildingRepository;
    private final BuildingMapper buildingMapper;
    private final RouteRepository routeRepository;



    public BuildingResponse createBuilding(BuildingRequest request) {
        BuildingEntity entity = buildingMapper.toEntity(request);
        BuildingEntity savedEntity = buildingRepository.save(entity);
        return buildingMapper.toResponse(savedEntity);
    }

    public BuildingResponse updateBuilding(@PathVariable Long id, @RequestBody BuildingRequest request){
        BuildingEntity targetEntity = buildingRepository.findById(id).orElseThrow(() -> 
        new RuntimeException("Building not found"));
        targetEntity.setCanonicalBuildingName(request.getCanonicalBuildingName());
        targetEntity.setAddress(request.getAddress());
        targetEntity.setCity(request.getCity());
        targetEntity.setNumberOfMachines(request.getNumberOfMachines());

        if (request.getRouteId() != null){;
            targetEntity.setRoute(routeRepository.getReferenceById(request.getRouteId()));
        }
        BuildingEntity updatedEntity = buildingRepository.save(targetEntity);
        return buildingMapper.toResponse(updatedEntity);
    }

    public List<BuildingResponse> getAllBuildings() {
        Collection<BuildingEntity> entities = buildingRepository.findAll();
        return entities.stream()
                .map(buildingMapper::toResponse)
                .toList();
    }

    public String deleteBuilding(Long id){
        String targetConName = buildingRepository.getReferenceById(id).getCanonicalBuildingName();
        buildingRepository.deleteById(id);
        return "Building successfully removed from DB : " + targetConName;
    }


}
