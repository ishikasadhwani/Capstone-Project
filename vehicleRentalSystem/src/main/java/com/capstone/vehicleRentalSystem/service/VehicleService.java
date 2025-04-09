package com.capstone.vehicleRentalSystem.service;

import com.capstone.vehicleRentalSystem.dto.VehicleDto;
import com.capstone.vehicleRentalSystem.entity.Vehicle;
import com.capstone.vehicleRentalSystem.entity.VehicleStatus;
import com.capstone.vehicleRentalSystem.repository.VehicleRepo;
import com.capstone.vehicleRentalSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehicleService {
    private final VehicleRepo vehicleRepo;

    @Autowired
    public VehicleService(VehicleRepo vehicleRepo) {
        this.vehicleRepo = vehicleRepo;
    }

    @Autowired
    private UserService userService;


    public List<VehicleDto> getAvailableVehicles() {
        List<Vehicle> vehicles = vehicleRepo.findByStatus(VehicleStatus.AVAILABLE);
        return vehicles.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<VehicleDto> getAllVehicles(String email) {
        userService.getUserByEmailAndRole(email, "ADMIN");
        List<Vehicle> vehicles = vehicleRepo.findAll();
        return vehicles.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private VehicleDto convertToDTO(Vehicle vehicle) {
        VehicleDto dto= new VehicleDto();
        dto.setId(vehicle.getId());
        dto.setName(vehicle.getName());
        dto.setCategory(vehicle.getCategory());
        dto.setFuelType(vehicle.getFuelType());
        dto.setSeatingCapacity(vehicle.getSeatingCapacity());
        dto.setVehicleNo(vehicle.getVehicleNo());
        dto.setStatus(vehicle.getStatus());
        dto.setPricePerDay(vehicle.getPricePerDay());
        return dto;
    }
    public VehicleDto addVehicle(String email, Vehicle vehicleDto) {
        userService.getUserByEmailAndRole(email, "ADMIN");
        vehicleRepo.save(vehicleDto);
        return convertToDTO(vehicleDto);
    }
}

