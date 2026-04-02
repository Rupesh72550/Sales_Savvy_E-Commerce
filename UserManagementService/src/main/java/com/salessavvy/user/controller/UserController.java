package com.salessavvy.user.controller;

import com.salessavvy.user.dto.UserDto;
import com.salessavvy.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(Principal principal) {
        return ResponseEntity.ok(userService.getProfile(principal.getName()));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(Principal principal, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateProfile(principal.getName(), userDto));
    }
}
