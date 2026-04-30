package com.js.ticketingsystem.event.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

public record EventSummaryResponse(
        UUID eventId,
        String title,
        LocalDateTime startTime,
        String venueName,
        String status
) {
}
