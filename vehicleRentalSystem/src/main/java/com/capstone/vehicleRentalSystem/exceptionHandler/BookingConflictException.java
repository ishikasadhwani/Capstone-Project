package com.capstone.vehicleRentalSystem.exceptionHandler;

public class BookingConflictException extends RuntimeException {
    public BookingConflictException(String message) {
        super(message);
    }
}
