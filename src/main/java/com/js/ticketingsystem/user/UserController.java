package com.js.ticketingsystem.user;

import com.js.ticketingsystem.user.dtos.UserResponse;
import com.js.ticketingsystem.user.dtos.UserSummaryResponse;
import com.js.ticketingsystem.user.dtos.UserUpdateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUserByEmail(@AuthenticationPrincipal(expression = "subject") String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @GetMapping
    public ResponseEntity<List<UserSummaryResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateUser(@AuthenticationPrincipal(expression = "subject") String email, UserUpdateRequest request) {
        return ResponseEntity.ok(userService.updateUserProfile(email, request));
    }
}
