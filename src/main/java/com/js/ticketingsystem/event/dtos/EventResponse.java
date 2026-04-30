package com.js.ticketingsystem.event.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

public record EventResponse(
        UUID eventId,
        String title,
        String description,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String status,
        String organizerName,
        String venueName,
        String categoryName
) {
}
