package com.js.ticketingsystem.order;

import com.js.ticketingsystem.common.ResourceNotFoundException;
import com.js.ticketingsystem.model.entities.*;
import com.js.ticketingsystem.model.enums.EventStatus;
import com.js.ticketingsystem.model.enums.OrderStatus;
import com.js.ticketingsystem.model.enums.TicketStatus;
import com.js.ticketingsystem.order.dtos.OrderCreateRequest;
import com.js.ticketingsystem.order.dtos.TicketSelection;
import com.js.ticketingsystem.repository.EventRepository;
import com.js.ticketingsystem.repository.OrderRepository;
import com.js.ticketingsystem.repository.TicketTypeRepository;
import com.js.ticketingsystem.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final TicketTypeRepository ticketTypeRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public OrderService(OrderRepository orderRepository, TicketTypeRepository ticketTypeRepository, UserRepository userRepository, EventRepository eventRepository) {
        this.orderRepository = orderRepository;
        this.ticketTypeRepository = ticketTypeRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    @Transactional
    public String createPendingOrder(OrderCreateRequest request, String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Event event = eventRepository.findById(request.eventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if (event.getStatus() != EventStatus.PUBLISHED) {
            throw new IllegalArgumentException("Tickets are not currently on sale!");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;

        Order order = Order.builder()
                .customer(customer)
                .orderDate(LocalDateTime.now())
                .totalAmount(totalAmount)
                .status(OrderStatus.PENDING)
                .build();

        for (TicketSelection selection : request.selections()) {
            TicketType ticketType = ticketTypeRepository.findById(selection.ticketTypeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ticket type not found"));

            if (!ticketType.getEvent().getId().equals(event.getId())) {
                throw new IllegalArgumentException("Invalid ticket selection for this event.");
            }

            // Check Inventory
            if (ticketType.getAvailableQuantity() < selection.quantity()) {
                throw new IllegalArgumentException("Not enough tickets available for: " + ticketType.getName());
            }

            // Deduct Inventory
            ticketType.setAvailableQuantity(ticketType.getAvailableQuantity() - selection.quantity());
            ticketTypeRepository.save(ticketType);

            // Calculate running total (Price * Quantity)
            BigDecimal lineItemTotal = ticketType.getPrice().multiply(BigDecimal.valueOf(selection.quantity()));
            totalAmount = totalAmount.add(lineItemTotal);

            for (int i = 0; i < selection.quantity(); i++) {
                Ticket ticket = Ticket.builder()
                        .order(order)
                        .ticketType(ticketType)
                        .ticketToken(UUID.randomUUID().toString())
                        .status(TicketStatus.ISSUED)
                        .build();
                order.getTickets().add(ticket);
            }
        }

        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);
        return savedOrder.getId().toString();
    }
}
