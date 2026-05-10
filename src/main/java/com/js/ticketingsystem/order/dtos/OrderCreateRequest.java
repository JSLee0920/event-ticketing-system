package com.js.ticketingsystem.order.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record OrderCreateRequest(
        @NotNull UUID eventId,
        @NotEmpty List<TicketSelection> selections
) {
}
