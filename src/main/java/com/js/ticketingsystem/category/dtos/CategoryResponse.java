package com.js.ticketingsystem.category.dtos;

import java.util.UUID;

public record CategoryResponse(
        UUID categoryId,
        String name,
        String description
) {
}
