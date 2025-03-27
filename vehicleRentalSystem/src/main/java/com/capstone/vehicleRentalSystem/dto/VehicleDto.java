package com.capstone.vehicleRentalSystem.dto;

import com.capstone.vehicleRentalSystem.entity.FuelType;
import com.capstone.vehicleRentalSystem.entity.VehicleCategory;
import com.capstone.vehicleRentalSystem.entity.VehicleStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDto {
    private Long id;
    private String vehicleNo;
    private String name;
    private VehicleCategory category; // Car, Bike, SUV, etc.
    private FuelType fuelType;
    private int seatingCapacity;
    private VehicleStatus status;
    private double pricePerDay;  // Added this field
}