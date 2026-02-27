package com.basicmapper.building;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class BuildingRequest {
    
    private String canonicalBuildingName;
    private String address;
    private String city;
    private int numberOfMachines;
    private Long routeId;
}
