package com.capstone.vehicleRentalSystem.controller;

import com.capstone.vehicleRentalSystem.dto.VehicleDto;
import com.capstone.vehicleRentalSystem.entity.Vehicle;
import com.capstone.vehicleRentalSystem.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/vehicles")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;

    //Get available vehicles
    @GetMapping("/available")
    public ResponseEntity<List<VehicleDto>> getAvailableVehicles() {
        List<VehicleDto> vehicles = vehicleService.getAvailableVehicles();
        return ResponseEntity.ok(vehicles);
    }

    //Get all vehicles
    @GetMapping("/all")
    public ResponseEntity<List<VehicleDto>> getAllVehicles(@RequestParam String email) {
        List<VehicleDto> vehicles = vehicleService.getAllVehicles(email);
        return ResponseEntity.ok(vehicles);
    }

    // Add a new vehicle (Admin only)
    @PostMapping("/add")
    public ResponseEntity<VehicleDto> addVehicle(@RequestParam String email, @RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(vehicleService.addVehicle(email, vehicle));
    }
}




