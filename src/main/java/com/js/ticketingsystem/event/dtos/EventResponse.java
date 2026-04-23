package com.js.ticketingsystem.event.dtos;

import java.time.LocalDateTime;

public record EventResponse(
        Long eventId,
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
