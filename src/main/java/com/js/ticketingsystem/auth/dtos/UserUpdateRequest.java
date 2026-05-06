package com.js.ticketingsystem.auth.dtos;

import jakarta.validation.constraints.NotBlank;

public record UserUpdateRequest(

        @NotBlank String name,
        @NotBlank String phoneNumber
) {
}
