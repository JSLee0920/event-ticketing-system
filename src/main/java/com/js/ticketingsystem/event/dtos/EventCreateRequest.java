package com.js.ticketingsystem.event.dtos;

import java.time.LocalDateTime;

public record EventCreateRequest(
        String title,
        String description,
        LocalDateTime startTime,
        LocalDateTime endTime,
        Long venueId,
        Long categoryId) {
}
