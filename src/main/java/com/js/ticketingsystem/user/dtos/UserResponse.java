package com.js.ticketingsystem.user.dtos;

import com.js.ticketingsystem.model.enums.Role;

import java.util.UUID;

public record UserResponse(
        UUID id,
        String email,
        String name,
        String phoneNum,
        Role role
) {
}
