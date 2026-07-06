package com.js.ticketingsystem.order.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record OrderResponse(
        UUID orderId,
        LocalDateTime orderDate,
        BigDecimal totalAmount,
        String status,
        UUID eventId,
        String eventTitle,
        LocalDateTime eventStartTime,
        String venueName,
        List<OrderLineItemResponse> lineItems
) {
}
