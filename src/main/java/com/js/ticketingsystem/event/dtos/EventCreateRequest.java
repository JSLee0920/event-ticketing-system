package com.js.ticketingsystem.event.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

public record EventCreateRequest(
        String title,
        String description,
        LocalDateTime startTime,
        LocalDateTime endTime,
        UUID venueId,
        UUID categoryId) {
}
