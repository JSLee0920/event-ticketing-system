package com.js.ticketingsystem.auth;

import com.js.ticketingsystem.auth.dtos.AuthResponse;
import com.js.ticketingsystem.auth.dtos.LoginRequest;
import com.js.ticketingsystem.auth.dtos.RegisterRequest;
import com.js.ticketingsystem.model.entities.User;
import com.js.ticketingsystem.model.enums.Role;
import com.js.ticketingsystem.repository.UserRepository;
import com.js.ticketingsystem.security.TokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered!");
        }

        // Create new user
        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .phoneNum(request.phoneNumber())
                .role(Role.CUSTOMER)
                .password(passwordEncoder.encode(request.password())).build();

        userRepository.save(user);

        // Generate token
        String token = tokenService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = tokenService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token);
    }
}
