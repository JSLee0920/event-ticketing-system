package com.js.ticketingsystem.order;

import com.js.ticketingsystem.model.entities.Event;
import com.js.ticketingsystem.model.entities.Order;
import com.js.ticketingsystem.model.entities.Ticket;
import com.js.ticketingsystem.model.entities.TicketType;
import com.js.ticketingsystem.order.dtos.OrderLineItemResponse;
import com.js.ticketingsystem.order.dtos.OrderResponse;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// Hand-written (not MapStruct) because line items are derived by grouping tickets per type
@Component
public class OrderMapper {

    public OrderResponse toOrderResponse(Order order) {
        Event event = order.getTickets().isEmpty()
                ? null
                : order.getTickets().get(0).getTicketType().getEvent();

        Map<TicketType, Long> ticketCounts = order.getTickets().stream()
                .collect(Collectors.groupingBy(Ticket::getTicketType, LinkedHashMap::new, Collectors.counting()));

        List<OrderLineItemResponse> lineItems = ticketCounts.entrySet().stream()
                .map(entry -> new OrderLineItemResponse(
                        entry.getKey().getId(),
                        entry.getKey().getName(),
                        entry.getKey().getPrice(),
                        entry.getValue().intValue()
                ))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getOrderDate(),
                order.getTotalAmount(),
                order.getStatus().name(),
                event != null ? event.getId() : null,
                event != null ? event.getTitle() : null,
                event != null ? event.getStartTime() : null,
                event != null && event.getVenue() != null ? event.getVenue().getName() : null,
                lineItems
        );
    }
}
