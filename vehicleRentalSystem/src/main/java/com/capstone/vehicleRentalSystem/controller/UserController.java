package com.capstone.vehicleRentalSystem.controller;

import com.capstone.vehicleRentalSystem.dto.UserDto;
import com.capstone.vehicleRentalSystem.entity.User;
import com.capstone.vehicleRentalSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://127.0.0.1:5500") // Allows requests from any frontend
@RestController
@RequestMapping("/users")

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String>login(@RequestBody User user){
        boolean isAuthenticated = userService.authenticateUser(user.getEmail(), user.getPassword());

        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password!");
        }

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
