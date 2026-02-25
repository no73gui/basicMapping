package com.basicmapper.machine;

import com.basicmapper.building.BuildingEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class MachineEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String canonicalMachineName;
    private String modelNumber;
    private String serialNumber;

    @ManyToOne
    @JoinColumn(name = "building_id")
    private BuildingEntity building;
}
