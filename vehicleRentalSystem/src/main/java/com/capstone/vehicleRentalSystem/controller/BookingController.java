package com.capstone.vehicleRentalSystem.controller;


import com.capstone.vehicleRentalSystem.dto.BookingDto;
import com.capstone.vehicleRentalSystem.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final BookingService bookingService;

    // Constructor injection
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/history")
    public ResponseEntity<List<BookingDto>> getBookingHistory(@RequestParam String email){
        List<BookingDto> bookings = bookingService.getAllBookings(email);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/userhistory")
    public ResponseEntity<List<BookingDto>> getUserBookingHistory(@RequestParam String email) {
        List<BookingDto> bookings = bookingService.getUserBookings(email);
        return ResponseEntity.ok(bookings);
    }


    @PostMapping("/create")
    public ResponseEntity<String> createBooking(@RequestParam String email, @RequestBody BookingDto bookingDTO) {
        String response = bookingService.createBooking(email, bookingDTO);
        return ResponseEntity.ok(response);
    }

//    @DeleteMapping("/delete/{bookingId}")
//    public ResponseEntity<String> deleteBooking(@RequestParam String email, @PathVariable Long bookingId) {
//        String response = bookingService.deleteBooking(email, bookingId);
//        return ResponseEntity.ok(response);
//    }
//
//    @DeleteMapping("/cancel/{bookingId}")
//    public ResponseEntity<String> cancelBooking(
//            @PathVariable Long bookingId,
//            @RequestParam String email) {
//        String response = bookingService.cancelBooking(bookingId, email);
//        return ResponseEntity.ok(response);
//    }


}

