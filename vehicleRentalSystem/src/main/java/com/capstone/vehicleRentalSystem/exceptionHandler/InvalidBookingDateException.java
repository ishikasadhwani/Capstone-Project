package com.capstone.vehicleRentalSystem.exceptionHandler;

public class InvalidBookingDateException extends RuntimeException {
    public InvalidBookingDateException(String message) {
        super(message);
    }
}