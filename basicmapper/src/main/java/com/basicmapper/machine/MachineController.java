package com.basicmapper.machine;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/machines")
@RequiredArgsConstructor
public class MachineController {

    private final MachineService machineService;


    @PostMapping
    public ResponseEntity<MachineResponse> createMachine(@RequestBody MachineRequest request) {
        return ResponseEntity.ok(machineService.createMachine(request));
    }
    

}
