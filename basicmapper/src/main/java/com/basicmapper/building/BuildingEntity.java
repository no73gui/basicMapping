package com.basicmapper.building;

import java.util.List;

import com.basicmapper.machine.MachineEntity;
import com.basicmapper.route.RouteEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class BuildingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buildingId;
    private String canonicalBuildingName;
    private String address;
    private String city;
    private int numberOfMachines;
    
    @OneToMany(mappedBy = "building")
    private List<MachineEntity> machines;

    @ManyToOne
    @JoinColumn(name = "route_id")
    private RouteEntity route;

}
