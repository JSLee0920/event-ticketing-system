package com.js.ticketingsystem.event.dtos;

import java.time.LocalDateTime;

public record EventSummaryResponse(
        Long eventId,
        String title,
        LocalDateTime startTime,
        String venueName,
        String status
) {
}
