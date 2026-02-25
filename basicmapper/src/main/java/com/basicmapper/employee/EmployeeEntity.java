package com.basicmapper.employee;

import java.time.LocalDate;

import com.basicmapper.route.RouteEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class EmployeeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;

    @Enumerated(EnumType.STRING)
    private EmploymentStatus employmentStatus;

    private LocalDate hireDate;
    
    // many employees can be assigned to one route
    // meaning each employee (many) can be assigned to one route (one)
    // child side of the relationship, 
    // specify the join column
    @ManyToOne
    @JoinColumn(name = "route_id")
    private RouteEntity route;


    
}
