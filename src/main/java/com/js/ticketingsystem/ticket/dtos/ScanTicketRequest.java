package com.js.ticketingsystem.ticket.dtos;

import jakarta.validation.constraints.NotBlank;

public record ScanTicketRequest(
        @NotBlank(message = "Ticket token is required")
        String token
) {
}
