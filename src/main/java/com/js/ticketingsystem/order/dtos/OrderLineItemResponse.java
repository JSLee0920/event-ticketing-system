package com.js.ticketingsystem.order.dtos;

import java.math.BigDecimal;
import java.util.UUID;

public record OrderLineItemResponse(
        UUID ticketTypeId,
        String ticketTypeName,
        BigDecimal unitPrice,
        int quantity
) {
}
