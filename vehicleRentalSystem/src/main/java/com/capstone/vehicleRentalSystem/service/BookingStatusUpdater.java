package com.capstone.vehicleRentalSystem.service;

import com.capstone.vehicleRentalSystem.entity.Booking;
import com.capstone.vehicleRentalSystem.entity.BookingStatus;
import com.capstone.vehicleRentalSystem.entity.Vehicle;
import com.capstone.vehicleRentalSystem.entity.VehicleStatus;
import com.capstone.vehicleRentalSystem.repository.BookingRepo;
import com.capstone.vehicleRentalSystem.repository.VehicleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class BookingStatusUpdater {

    private final VehicleRepo vehicleRepository;
    private final BookingRepo bookingRepository;


    // Runs every midnight to update booking & vehicle statuses
//    @Scheduled(cron = "0 0 0 * * ?")
//    public void updateBookingAndVehicleStatus() {
//        processBookingUpdates();
//    }

    //Runs when the application starts, ensuring statuses are correct even after downtime.
    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationStartup() {
        processBookingUpdates();
    }

    @Transactional
    private void processBookingUpdates() {
        LocalDate today = LocalDate.now();


        // Update booking status to COMPLETED if yesterday was the end date
        List<Booking> completedBookings = bookingRepository.findBookingsByEndDate(today.minusDays(1));
        for (Booking booking : completedBookings) {
            if (booking.getStatus() != BookingStatus.COMPLETED) { // Prevent redundant updates
                booking.setStatus(BookingStatus.COMPLETED);
                booking.getVehicle().setStatus(VehicleStatus.AVAILABLE);
                bookingRepository.save(booking);
                vehicleRepository.save(booking.getVehicle());
            }
        }

        // Update booking status to ACTIVE if today is the start date
        List<Booking> startingBookings = bookingRepository.findBookingsByStartDate(today);
        for (Booking booking : startingBookings) {
            if (booking.getStatus() != BookingStatus.ACTIVE) { // Prevent redundant updates
                booking.setStatus(BookingStatus.ACTIVE);
                booking.getVehicle().setStatus(VehicleStatus.BOOKED);
                bookingRepository.save(booking);
                vehicleRepository.save(booking.getVehicle());
            }
        }
    }
}
