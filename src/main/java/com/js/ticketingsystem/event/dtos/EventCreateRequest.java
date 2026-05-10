package com.js.ticketingsystem.event.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record EventCreateRequest(
        @NotBlank String title,
        String description,
        @NotNull LocalDateTime startTime,
        @NotNull LocalDateTime endTime,
        @NotNull UUID venueId,
        @NotNull UUID categoryId,
        @NotEmpty @Valid List<TicketTypeRequest> ticketTypes
) {
}

