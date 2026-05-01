package com.js.ticketingsystem.event.dtos;

import java.util.UUID;

public record EventUpdateRequest(String title, String description, UUID categoryId) {
}
