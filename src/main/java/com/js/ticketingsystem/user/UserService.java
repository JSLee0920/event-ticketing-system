package com.js.ticketingsystem.user;

import com.js.ticketingsystem.model.entities.User;
import com.js.ticketingsystem.repository.UserRepository;
import com.js.ticketingsystem.user.dtos.UserResponse;
import com.js.ticketingsystem.user.dtos.UserSummaryResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserResponse getUserById(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        return userMapper.toUserResponse(user);
    }

    public List<UserSummaryResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserSummaryResponse)
                .toList();
    }
}
