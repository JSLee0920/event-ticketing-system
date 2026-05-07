package com.js.ticketingsystem.user;

import com.js.ticketingsystem.model.enums.Role;
import com.js.ticketingsystem.user.dtos.UserResponse;
import com.js.ticketingsystem.user.dtos.UserSummaryResponse;
import com.js.ticketingsystem.user.dtos.UserUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    // For all logged-in users
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUserByEmail(@AuthenticationPrincipal(expression = "subject") String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateUser(@AuthenticationPrincipal(expression = "subject") String email, @Valid @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(userService.updateUserProfile(email, request));
    }

    // Staff Methods Only
    @GetMapping
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<List<UserSummaryResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<UserResponse> getUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<UserResponse> updateUserRole(@PathVariable UUID id, @Valid @RequestParam Role role) {
        return ResponseEntity.ok(userService.updateRole(id, role));
    }
}
