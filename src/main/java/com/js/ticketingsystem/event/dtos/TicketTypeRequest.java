package com.js.ticketingsystem.event.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record TicketTypeRequest(
        @NotBlank String name,
        @NotNull @Min(0) BigDecimal price,
        String description,
        @NotNull @Min(1) Integer quantity
) {

}
