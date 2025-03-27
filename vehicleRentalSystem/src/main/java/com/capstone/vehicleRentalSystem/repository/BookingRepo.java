package com.capstone.vehicleRentalSystem.repository;

import com.capstone.vehicleRentalSystem.entity.Booking;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId); // Get bookings for a specific user
    @Query("SELECT b FROM Booking b WHERE b.vehicle.id = :vehicleId AND :today BETWEEN b.startDate AND b.endDate")
    Optional<Booking> findActiveBooking(@Param("vehicleId") Long vehicleId, @Param("today") LocalDate today);

    @Query("SELECT b FROM Booking b WHERE b.vehicle.id = :vehicleId ORDER BY b.endDate DESC")
    List<Booking> findLastBookingByVehicle(@Param("vehicleId") Long vehicleId, Pageable pageable);

    @Query("SELECT b FROM Booking b WHERE b.startDate = :date")
    List<Booking> findBookingsByStartDate(@Param("date") LocalDate date);

    @Query("SELECT b FROM Booking b WHERE b.endDate = :date")
    List<Booking> findBookingsByEndDate(@Param("date") LocalDate date);



}

