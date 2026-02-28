package com.basicmapper.building;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/buildings")
@RequiredArgsConstructor
public class BuildingController {

    private final BuildingService buildingService;

    @PostMapping
    public ResponseEntity<BuildingResponse> createBuilding(@RequestBody BuildingRequest request) {
        return ResponseEntity.ok(buildingService.createBuilding(request));
    }

    @GetMapping
    public List<BuildingResponse> getAllBuildings() {
        return buildingService.getAllBuildings();
    }

    @PutMapping("/{id}")
    public ResponseEntity<BuildingResponse> updateSingleBuilding(@PathVariable Long id, @RequestBody BuildingRequest entity) {

        return ResponseEntity.ok(buildingService.updateBuilding(id, entity));
        
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<String> deleteSingleBuilding(@PathVariable long id) {
       
       return ResponseEntity.ok(buildingService.deleteBuilding(id));
   }

    
}
