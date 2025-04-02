package com.capstone.vehicleRentalSystem.controller;

import com.capstone.vehicleRentalSystem.dto.UserDto;
import com.capstone.vehicleRentalSystem.entity.User;
import com.capstone.vehicleRentalSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342") // Allows requests from any frontend
@RestController
@RequestMapping("/users")

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        boolean isAuthenticated = userService.authenticateUser(user.getEmail(), user.getPassword());

        if (isAuthenticated) {
            UserDto userDto = userService.getUserByEmail(user.getEmail()); // Fetch user details
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password!");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers(@RequestParam String email) {
        // Verify that the requester is an admin
        User admin = userService.getUserByEmailAndRole(email, "ADMIN");

        // Fetch and return all users if admin is verified
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }




    @GetMapping("/{email}")
    public UserDto getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/register")
    public UserDto registerUser(@RequestBody User user, @RequestParam String email) {
        return userService.registerUser(user, email);
    }
}
