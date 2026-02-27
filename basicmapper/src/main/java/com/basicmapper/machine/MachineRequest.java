package com.basicmapper.machine;

import lombok.Data;

@Data
public class MachineRequest {

    private String canonicalMachineName;
    private String modelNumber;
    private String serialNumber;
    private int buildingId;
    
}
