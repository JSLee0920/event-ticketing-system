package com.js.ticketingsystem.user.dtos;

import jakarta.validation.constraints.NotBlank;

public record UserUpdateRequest(

        @NotBlank String name,
        @NotBlank String phoneNumber
) {
}
