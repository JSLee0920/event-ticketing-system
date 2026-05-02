package com.js.ticketingsystem.auth.dtos;

public record RegisterRequest(
        String name,
        String email,
        String password,
        String phoneNumber
) {
}
