package com.js.ticketingsystem.model.dtos;

import com.js.ticketingsystem.model.enums.Role;

public record RegisterRequest(
    String name,
    String email,
    String password,
    String phoneNumber,
    Role role
) { }
