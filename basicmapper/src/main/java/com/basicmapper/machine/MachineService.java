package com.basicmapper.machine;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MachineService {

    private final MachineRepository machineRepository;
    private final MachineMapper machineMapper;

    public MachineResponse createMachine(MachineRequest request) {
        MachineEntity entity = machineMapper.toEntity(request);
        MachineEntity savedEntity = machineRepository.save(entity);
        return machineMapper.toResponse(savedEntity);
    }
}
