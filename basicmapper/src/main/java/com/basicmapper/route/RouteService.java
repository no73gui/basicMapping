package com.basicmapper.route;

import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class RouteService {
    private final RouteRepository routeRepository;
    private final RouteMapper routeMapper;

    public RouteResponse createRoute(RouteRequest request) {
        RouteEntity entity = routeMapper.toEntity(request);
        RouteEntity savedEntity = routeRepository.save(entity);
        return routeMapper.toResponse(savedEntity);
    }

    public List<RouteResponse> getAllRoute(){
        Collection<RouteEntity> entities = routeRepository.findAll();
        return entities.stream()
                .map(routeMapper::toResponse)
                .toList();
    }

    public String deleteRoute(Long id){
        RouteEntity target = routeRepository.getReferenceById(id);
        routeRepository.deleteById(id);
        return "Entity removed from database : " + target.getCanonicalName();
    }
    
}
