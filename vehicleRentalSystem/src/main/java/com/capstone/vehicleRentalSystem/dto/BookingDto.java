package com.capstone.vehicleRentalSystem.dto;

import com.capstone.vehicleRentalSystem.entity.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private Long id;
    private Long userId;
    private String userName;
    private Long vehicleId;
    private String vehicleName;
    private BookingStatus status;
    private LocalDate startDate;
    private LocalDate endDate;



}
