package com.js.ticketingsystem.ticket.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record TicketResponse(
        UUID ticketId,
        String ticketToken,
        String status,
        String ticketTypeName,
        BigDecimal price,
        UUID eventId,
        String eventTitle,
        LocalDateTime eventStartTime,
        String venueName,
        LocalDateTime scannedAt
) {
}
