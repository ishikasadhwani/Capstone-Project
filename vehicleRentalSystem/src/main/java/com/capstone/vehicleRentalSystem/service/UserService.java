package com.capstone.vehicleRentalSystem.service;

import com.capstone.vehicleRentalSystem.exceptionHandler.ResourceNotFoundException;
import com.capstone.vehicleRentalSystem.exceptionHandler.UnauthorizedAccessException;
import com.capstone.vehicleRentalSystem.repository.UserRepo;
import com.capstone.vehicleRentalSystem.entity.User;
import com.capstone.vehicleRentalSystem.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDto registerUser(User user, String email) {
        // Encrypt the password before saving
        getUserByEmailAndRole(email, "ADMIN") ;
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(user.getRole());
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    public boolean authenticateUser(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        // Compare raw password with the stored hashed password
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    public User getUserByEmailAndRole(String email, String requiredRole) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (!user.getRole().toString().equalsIgnoreCase(requiredRole)) {
            throw new UnauthorizedAccessException("Access denied! Only " + requiredRole + " can perform this action.");
        }
        return user;
    }

    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return convertToDTO(user);
    }

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole()))
                .collect(Collectors.toList());
    }


    private UserDto convertToDTO(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }
}

