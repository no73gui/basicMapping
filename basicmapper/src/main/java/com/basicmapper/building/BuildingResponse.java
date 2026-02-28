package com.basicmapper.building;

import lombok.Data;

@Data
public class BuildingResponse {

        private Long buildingId;
        private String canonicalBuildingName;
        private String address;
        private String city;
        private int numberOfMachines;
        private Long routeId;

}
