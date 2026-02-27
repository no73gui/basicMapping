package com.basicmapper.machine;

import lombok.Data;

@Data
public class MachineResponse {
    private int id;
    private String canonicalMachineName;
    private String modelNumber;
    private String serialNumber;
    private int buildingId;
}
