package com.basicmapper.building;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/buildings")
@RequiredArgsConstructor
public class BuildingController {

    private final BuildingService buildingService;

 @PostMapping
    public ResponseEntity<BuildingResponse> createBuilding(@RequestBody BuildingRequest request) {
        return ResponseEntity.ok(buildingService.createBuilding(request));
}
}
