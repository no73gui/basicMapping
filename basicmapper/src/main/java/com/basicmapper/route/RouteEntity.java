package com.basicmapper.route;

import java.util.List;

import com.basicmapper.building.BuildingEntity;
import com.basicmapper.employee.EmployeeEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class RouteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String canonicalName;

    // parent side of the relationship
    @OneToMany(mappedBy = "route")
    private List<EmployeeEntity> employees;

    // child of building
    @OneToMany(mappedBy = "route")
    // specify the join column in the building table
    private List<BuildingEntity> buildings;


    
}
