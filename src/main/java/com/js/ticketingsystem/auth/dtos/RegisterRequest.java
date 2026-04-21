package com.js.ticketingsystem.auth.dtos;

import com.js.ticketingsystem.model.enums.Role;

public record RegisterRequest(
    String name,
    String email,
    String password,
    String phoneNumber,
    Role role
) { }
