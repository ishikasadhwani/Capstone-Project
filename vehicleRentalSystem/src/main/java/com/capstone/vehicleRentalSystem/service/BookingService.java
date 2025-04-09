package com.capstone.vehicleRentalSystem.service;

import com.capstone.vehicleRentalSystem.dto.BookingDto;
import com.capstone.vehicleRentalSystem.entity.*;
import com.capstone.vehicleRentalSystem.repository.BookingRepo;
import com.capstone.vehicleRentalSystem.repository.UserRepo;
import com.capstone.vehicleRentalSystem.repository.VehicleRepo;
import jakarta.persistence.Column;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

public class BookingService {
    private final BookingRepo bookingRepo;
    private final UserRepo userRepo;
    private final VehicleRepo vehicleRepo;

    public BookingService(BookingRepo bookingRepo, UserRepo userRepo, VehicleRepo vehicleRepo) {
        this.bookingRepo = bookingRepo;
        this.userRepo = userRepo;
        this.vehicleRepo = vehicleRepo;
    }

    private User getUserByEmailAndRole(String email, String requiredRole) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().toString().equalsIgnoreCase(requiredRole)) {
            throw new RuntimeException("Access denied! Only " + requiredRole + " can perform this action.");
        }
        return user;
    }

    public List<BookingDto> getUserBookings(String email) {
        // Fetch User by Email
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch Bookings by User ID
        List<Booking> bookings = bookingRepo.findByUserId(user.getId());

        // Convert to DTOs
        return bookings.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    public List<BookingDto> getAllBookings(String email) {
        // Validate if the user is an ADMIN
        getUserByEmailAndRole(email, "ADMIN");

        // Fetch all bookings and map to DTOs
        return bookingRepo.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private BookingDto convertToDTO(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUser().getId());
        dto.setUserName(booking.getUserName());
        dto.setVehicleId(booking.getVehicle().getId());
        dto.setVehicleName(booking.getVehicleName());
        dto.setStatus(booking.getStatus());
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        return dto;
    }

    public String createBooking(String email, BookingDto bookingDTO) {
        User user = getUserByEmailAndRole(email, "USER"); // ✅ Ensure it's a USER
        Vehicle vehicle = vehicleRepo.findById(bookingDTO.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        // Check if the vehicle is already booked for the requested dates
        List<Booking> overlappingBookings = bookingRepo.findConflictingBookings(
                bookingDTO.getVehicleId(),
                bookingDTO.getStartDate(),
                bookingDTO.getEndDate());

        if (!overlappingBookings.isEmpty()) {
            throw new RuntimeException("Vehicle is already booked from " +
                    overlappingBookings.get(0).getStartDate() + " to " + overlappingBookings.get(0).getEndDate());
        }

        // Create new booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setUserName(bookingDTO.getUserName());
        booking.setVehicle(vehicle);
        booking.setVehicleName(bookingDTO.getVehicleName());
        booking.setStartDate(bookingDTO.getStartDate());
        booking.setEndDate(bookingDTO.getEndDate());

        if (bookingDTO.getStartDate().isEqual(LocalDate.now())) {
            booking.setStatus(BookingStatus.ACTIVE); // If booking starts today, set to ACTIVE
            vehicle.setStatus(VehicleStatus.BOOKED);
            vehicleRepo.save(vehicle);
        } else {
            booking.setStatus(BookingStatus.CONFIRMED);
        }

        bookingRepo.save(booking);
        return "Booking created successfully!";
    }

//    // Reusable function to get User by ID
//    private User getUserById(Long userId) {
//        return userRepo.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
//    }
//
//    // Reusable function to get Vehicle by ID
//    private Vehicle getVehicleById(Long vehicleId) {
//        return vehicleRepo.findById(vehicleId)
//                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + vehicleId));
//    }
}


