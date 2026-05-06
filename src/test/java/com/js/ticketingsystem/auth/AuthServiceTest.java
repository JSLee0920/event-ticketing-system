package com.js.ticketingsystem.auth;

import com.js.ticketingsystem.auth.dtos.AuthResponse;
import com.js.ticketingsystem.auth.dtos.LoginRequest;
import com.js.ticketingsystem.model.entities.User;
import com.js.ticketingsystem.model.enums.Role;
import com.js.ticketingsystem.repository.UserRepository;
import com.js.ticketingsystem.security.TokenService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenService tokenService;

    @InjectMocks
    private AuthService authService;

    @Test
    void whenValidCredentials_thenGenerateToken() {
        // Arrange
        User testUser = User.builder()
                .email("danielgoh123@gmail.com")
                .password("encodedPassword")
                .role(Role.CUSTOMER)
                .phoneNum("017-2345798")
                .build();

        when(userRepository.findByEmail("danielgoh123@gmail.com"))
                .thenReturn(Optional.of(testUser));

        when(passwordEncoder.matches("bigFatDan123#", "encodedPassword"))
                .thenReturn(true);

        when(tokenService.generateToken(any(), any()))
                .thenReturn("fake-jwt-token");

        LoginRequest loginRequest =
                new LoginRequest("danielgoh123@gmail.com", "bigFatDan123#");

        // Act
        AuthResponse response = authService.login(loginRequest);

        // Assert
        assertNotNull(response);
        assertNotNull(response.token());
        verify(userRepository, times(1))
                .findByEmail("danielgoh123@gmail.com");
    }
}

