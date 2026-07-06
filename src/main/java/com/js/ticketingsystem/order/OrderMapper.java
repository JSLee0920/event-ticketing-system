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
import java.util.UUID;
import java.util.stream.Collectors;

// Hand-written (not MapStruct) because line items are derived by grouping tickets per type
@Component
public class OrderMapper {

    public OrderResponse toOrderResponse(Order order) {
        Event event = order.getTickets().isEmpty()
                ? null
                : order.getTickets().get(0).getTicketType().getEvent();

        // Group by ticket type ID (not the entity) so we don't depend on TicketType equals/hashCode
        Map<UUID, List<Ticket>> ticketsByTypeId = order.getTickets().stream()
                .collect(Collectors.groupingBy(t -> t.getTicketType().getId(), LinkedHashMap::new, Collectors.toList()));

        List<OrderLineItemResponse> lineItems = ticketsByTypeId.values().stream()
                .map(tickets -> {
                    TicketType type = tickets.get(0).getTicketType();
                    return new OrderLineItemResponse(
                            type.getId(),
                            type.getName(),
                            type.getPrice(),
                            tickets.size()
                    );
                })
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
