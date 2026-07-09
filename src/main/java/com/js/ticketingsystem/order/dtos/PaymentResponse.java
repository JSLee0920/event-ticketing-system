package com.js.ticketingsystem.order.dtos;

public record PaymentResponse(
        String status,
        String transactionId
) {
}
