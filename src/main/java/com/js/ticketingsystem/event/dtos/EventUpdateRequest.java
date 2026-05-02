package com.js.ticketingsystem.event.dtos;

import jakarta.validation.constraints.Size;

import java.util.UUID;

public record EventUpdateRequest(
        @Size(min = 1) String title,
        String description,
        UUID categoryId
) {
}
