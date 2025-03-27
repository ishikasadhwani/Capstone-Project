package com.capstone.vehicleRentalSystem.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vehicles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name= "vehicle_no", nullable=false, unique=true)
    private String vehicleNo;

    @Column(name="vehicle_name", nullable = false)
    private String name;

    @Column(name="price_per_day", nullable = false)
    private Double pricePerDay;



    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleCategory category; // CAR, BIKE

    @Enumerated(EnumType.STRING)
    @Column(name="fuel_type",nullable = false)
    private FuelType fuelType; // PETROL, DIESEL, ELECTRIC

    @Column(name="seating_capacity",nullable = false)
    private int seatingCapacity; // Number of seats

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleStatus status; // AVAILABLE, BOOKED
}
