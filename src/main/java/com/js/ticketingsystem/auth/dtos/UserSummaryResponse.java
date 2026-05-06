package com.js.ticketingsystem.auth.dtos;

import com.js.ticketingsystem.model.enums.Role;

import java.util.UUID;

public record UserSummaryResponse(
        UUID id,
        String email,
        String name,
        Role role
) {
}
