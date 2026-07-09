package com.js.ticketingsystem.auth.dtos;

import com.js.ticketingsystem.model.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank String name,
        @Email @NotBlank String email,
        @NotBlank @Size(min = 8) String password,
        @NotBlank String phoneNumber,
        @NotNull Role role,
        String organizationName,
        String inviteCode
) {
}
