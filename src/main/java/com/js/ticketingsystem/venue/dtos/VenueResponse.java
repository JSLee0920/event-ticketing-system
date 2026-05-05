package com.js.ticketingsystem.venue.dtos;

import java.util.UUID;

public record VenueResponse(
        UUID id,
        String name,
        String address,
        Integer capacity
) {
}
