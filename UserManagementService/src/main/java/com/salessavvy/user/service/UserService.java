package com.salessavvy.user.service;

import com.salessavvy.user.dto.UserDto;
import com.salessavvy.user.model.User;
import com.salessavvy.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserDto getProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return UserDto.fromEntity(user);
    }

    public UserDto updateProfile(String username, UserDto userDto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        if (userDto.getEmail() != null && !userDto.getEmail().isEmpty()) {
            user.setEmail(userDto.getEmail());
        }
        if (userDto.getFullName() != null && !userDto.getFullName().isEmpty()) {
            user.setFullName(userDto.getFullName());
        }

        User savedUser = userRepository.save(user);
        return UserDto.fromEntity(savedUser);
    }
}
