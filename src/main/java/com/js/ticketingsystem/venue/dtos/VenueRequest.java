package com.js.ticketingsystem.venue.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VenueRequest(
        @NotBlank String name,
        @NotBlank String address,
        @NotNull @Min(value = 1, message = "Capacity must be at least 1")
        Integer capacity
) {
}
