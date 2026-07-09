package com.js.ticketingsystem.auth;

import com.js.ticketingsystem.auth.dtos.AuthResponse;
import com.js.ticketingsystem.auth.dtos.LoginRequest;
import com.js.ticketingsystem.auth.dtos.RegisterRequest;
import com.js.ticketingsystem.common.DuplicateResourceException;
import com.js.ticketingsystem.model.entities.User;
import com.js.ticketingsystem.model.enums.Role;
import com.js.ticketingsystem.repository.UserRepository;
import com.js.ticketingsystem.security.TokenService;
import org.springframework.security.authentication.BadCredentialsException;
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
            throw new DuplicateResourceException("Email is already registered");
        }

        Role role = request.role();
        if (role == Role.ORGANIZER && isBlank(request.organizationName())) {
            throw new IllegalArgumentException("Organization name is required for organizers");
        }
        // Staff accounts must be provisioned through a verified invite flow, which does
        // not exist yet. Block self-registration so anyone can't claim STAFF by sending
        // an arbitrary invite code. Re-enable with real verification once it's built.
        if (role == Role.STAFF) {
            throw new IllegalArgumentException("Staff accounts cannot be self-registered");
        }

        // Create new user
        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .phoneNum(request.phoneNumber())
                .role(role)
                .organizationName(role == Role.ORGANIZER ? request.organizationName() : null)
                .password(passwordEncoder.encode(request.password())).build();

        userRepository.save(user);

        // Generate token
        String token = tokenService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token);
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String token = tokenService.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token);
    }
}
