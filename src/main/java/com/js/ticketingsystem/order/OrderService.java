package com.js.ticketingsystem.order;

import com.js.ticketingsystem.common.ResourceNotFoundException;
import com.js.ticketingsystem.model.entities.*;
import com.js.ticketingsystem.model.enums.EventStatus;
import com.js.ticketingsystem.model.enums.OrderStatus;
import com.js.ticketingsystem.model.enums.TicketStatus;
import com.js.ticketingsystem.order.dtos.OrderCreateRequest;
import com.js.ticketingsystem.order.dtos.OrderResponse;
import com.js.ticketingsystem.order.dtos.TicketSelection;
import com.js.ticketingsystem.repository.EventRepository;
import com.js.ticketingsystem.repository.OrderRepository;
import com.js.ticketingsystem.repository.TicketTypeRepository;
import com.js.ticketingsystem.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;
    private final TicketTypeRepository ticketTypeRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final OrderMapper orderMapper;

    @Value("${app.orders.pending-expiry-minutes:15}")
    private long pendingExpiryMinutes;

    @Value("${app.orders.expiry-batch-size:100}")
    private int expiryBatchSize;

    public OrderService(
        OrderRepository orderRepository,
        TicketTypeRepository ticketTypeRepository,
        UserRepository userRepository,
        EventRepository eventRepository,
        OrderMapper orderMapper
    ) {
        this.orderRepository = orderRepository;
        this.ticketTypeRepository = ticketTypeRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.orderMapper = orderMapper;
    }

    @Transactional
    public OrderResponse createPendingOrder(
        OrderCreateRequest request,
        String customerEmail
    ) {
        User customer = userRepository
            .findByEmail(customerEmail)
            .orElseThrow(() ->
                new ResourceNotFoundException("Customer not found")
            );

        Event event = eventRepository
            .findById(request.eventId())
            .orElseThrow(() ->
                new ResourceNotFoundException("Event not found")
            );

        if (event.getStatus() != EventStatus.PUBLISHED) {
            throw new IllegalArgumentException(
                "Tickets are not currently on sale!"
            );
        }

        BigDecimal totalAmount = BigDecimal.ZERO;

        Order order = Order.builder()
            .customer(customer)
            .orderDate(LocalDateTime.now())
            .totalAmount(totalAmount)
            .status(OrderStatus.PENDING)
            .build();

        for (TicketSelection selection : request.selections()) {
            TicketType ticketType = ticketTypeRepository
                .findById(selection.ticketTypeId())
                .orElseThrow(() ->
                    new ResourceNotFoundException("Ticket type not found")
                );

            if (!ticketType.getEvent().getId().equals(event.getId())) {
                throw new IllegalArgumentException(
                    "Invalid ticket selection for this event."
                );
            }

            // Check Inventory
            if (ticketType.getAvailableQuantity() < selection.quantity()) {
                throw new IllegalArgumentException(
                    "Not enough tickets available for: " + ticketType.getName()
                );
            }

            // Deduct Inventory
            ticketType.setAvailableQuantity(
                ticketType.getAvailableQuantity() - selection.quantity()
            );
            ticketTypeRepository.save(ticketType);

            // Calculate running total (Price * Quantity)
            BigDecimal lineItemTotal = ticketType
                .getPrice()
                .multiply(BigDecimal.valueOf(selection.quantity()));
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
        return orderMapper.toOrderResponse(savedOrder);
    }

    @Transactional
    public List<OrderResponse> getMyOrders(String customerEmail) {
        return orderRepository.findByCustomerEmailOrderByOrderDateDesc(customerEmail)
                .stream()
                .map(orderMapper::toOrderResponse)
                .toList();
    }

    @Transactional
    public OrderResponse getOrderById(UUID orderId, String customerEmail) {
        Order order = findOwnedOrder(orderId, customerEmail);
        return orderMapper.toOrderResponse(order);
    }

    @Transactional
    public OrderResponse cancelOrder(UUID orderId, String customerEmail) {
        Order order = findOwnedOrder(orderId, customerEmail);

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalArgumentException("Only pending orders can be cancelled");
        }

        cancelAndReleaseInventory(order);
        // @Version on Order guards against a concurrent payment confirming this order mid-cancel.
        try {
            return orderMapper.toOrderResponse(orderRepository.saveAndFlush(order));
        } catch (ObjectOptimisticLockingFailureException e) {
            throw new IllegalArgumentException("This order was updated concurrently. Please retry.");
        }
    }

    // Abandoned checkouts hold inventory, so stale pending orders must be swept back.
    // Bounded per-run batch keeps each transaction short; the frequent schedule drains backlog over time.
    @Scheduled(fixedRateString = "${app.orders.expiry-check-ms:60000}")
    @Transactional
    public void expireStalePendingOrders() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(pendingExpiryMinutes);
        List<Order> staleOrders = orderRepository.findByStatusAndOrderDateBefore(
                OrderStatus.PENDING, cutoff, PageRequest.of(0, expiryBatchSize));

        // A concurrent payment can win the @Version race and throw here, rolling back the
        // whole batch. That is fine: confirmed orders are no longer PENDING, so the next
        // scheduled run simply re-processes whatever is still stale.
        for (Order order : staleOrders) {
            cancelAndReleaseInventory(order);
            orderRepository.save(order);
        }

        if (!staleOrders.isEmpty()) {
            log.info("Expired {} stale pending order(s) and released their inventory", staleOrders.size());
        }
    }

    private Order findOwnedOrder(UUID orderId, String customerEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (!order.getCustomer().getEmail().equals(customerEmail)) {
            throw new AccessDeniedException("You do not have permission to view this order");
        }
        return order;
    }

    private void cancelAndReleaseInventory(Order order) {
        for (Ticket ticket : order.getTickets()) {
            TicketType ticketType = ticket.getTicketType();
            ticketType.setAvailableQuantity(ticketType.getAvailableQuantity() + 1);
            ticket.setStatus(TicketStatus.VOIDED);
            ticketTypeRepository.save(ticketType);
        }
        order.setStatus(OrderStatus.CANCELLED);
    }
}
