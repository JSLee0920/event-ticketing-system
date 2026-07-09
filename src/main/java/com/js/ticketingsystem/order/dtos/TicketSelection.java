package com.js.ticketingsystem.order.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record TicketSelection(
        @NotNull UUID ticketTypeId,
        @Min(1) int quantity
) {

}
