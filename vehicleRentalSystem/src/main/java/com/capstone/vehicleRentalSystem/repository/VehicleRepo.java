package com.capstone.vehicleRentalSystem.repository;

import com.capstone.vehicleRentalSystem.entity.Vehicle;
import com.capstone.vehicleRentalSystem.entity.VehicleCategory;
import com.capstone.vehicleRentalSystem.entity.VehicleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepo extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByStatus(VehicleStatus status);


}
