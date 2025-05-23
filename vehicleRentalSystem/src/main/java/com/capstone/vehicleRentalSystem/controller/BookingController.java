package com.capstone.vehicleRentalSystem.controller;

import com.capstone.vehicleRentalSystem.dto.BookingDto;
import com.capstone.vehicleRentalSystem.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/history")
    public ResponseEntity<List<BookingDto>> getBookingHistory(@RequestParam String email){
        List<BookingDto> bookings = bookingService.getAllBookings(email);
        if (bookings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/userHistory")
    public ResponseEntity<List<BookingDto>> getUserBookingHistory(@RequestParam String email) {
        List<BookingDto> bookings = bookingService.getUserBookings(email);
        if (bookings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createBooking(@RequestParam String email, @RequestBody BookingDto bookingDTO) {
        String response = bookingService.createBooking(email, bookingDTO);
        return ResponseEntity.ok(response);
    }
}

