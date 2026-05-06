package com.js.ticketingsystem.user.dtos;

import com.js.ticketingsystem.model.enums.Role;

import java.util.UUID;

public record UserSummaryResponse(
        UUID id,
        String email,
        String name,
        Role role
) {
}
