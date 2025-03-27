package com.capstone.vehicleRentalSystem.service;


import com.capstone.vehicleRentalSystem.entity.Booking;
import com.capstone.vehicleRentalSystem.entity.BookingStatus;
import com.capstone.vehicleRentalSystem.entity.Vehicle;
import com.capstone.vehicleRentalSystem.entity.VehicleStatus;
import com.capstone.vehicleRentalSystem.repository.BookingRepo;
import com.capstone.vehicleRentalSystem.repository.VehicleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class BookingStatusUpdater {

    private final VehicleRepo vehicleRepository;
    private final BookingRepo bookingRepository;

    @Scheduled(cron = "0 0 0 * * ?") // Runs at midnight
    public void updateBookingAndVehicleStatus() {
        LocalDate today = LocalDate.now();

        // ✅ Update booking status to ACTIVE if today is the start date
        List<Booking> startingBookings = bookingRepository.findBookingsByStartDate(today);
        for (Booking booking : startingBookings) {
            booking.setStatus(BookingStatus.ACTIVE);
            booking.getVehicle().setStatus(VehicleStatus.BOOKED);
            bookingRepository.save(booking);
            vehicleRepository.save(booking.getVehicle());
        }

        // ✅ Update booking status to COMPLETED if today is the end date + 1
        List<Booking> completedBookings = bookingRepository.findBookingsByEndDate(today.minusDays(1));
        for (Booking booking : completedBookings) {
            booking.setStatus(BookingStatus.COMPLETED);
            booking.getVehicle().setStatus(VehicleStatus.AVAILABLE);
            bookingRepository.save(booking);
            vehicleRepository.save(booking.getVehicle());
        }
    }
}


