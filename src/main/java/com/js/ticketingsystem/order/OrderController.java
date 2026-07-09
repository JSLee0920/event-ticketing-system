package com.js.ticketingsystem.order;

import com.js.ticketingsystem.order.dtos.OrderCreateRequest;
import com.js.ticketingsystem.order.dtos.OrderResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<OrderResponse> createOrder(
            @Valid @RequestBody OrderCreateRequest request,
            @AuthenticationPrincipal(expression = "subject") String customerEmail
    ) {
        OrderResponse order = orderService.createPendingOrder(request, customerEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<OrderResponse>> getMyOrders(
            @AuthenticationPrincipal(expression = "subject") String customerEmail
    ) {
        return ResponseEntity.ok(orderService.getMyOrders(customerEmail));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable UUID id,
            @AuthenticationPrincipal(expression = "subject") String customerEmail
    ) {
        return ResponseEntity.ok(orderService.getOrderById(id, customerEmail));
    }

    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<OrderResponse> cancelOrder(
            @PathVariable UUID id,
            @AuthenticationPrincipal(expression = "subject") String customerEmail
    ) {
        return ResponseEntity.ok(orderService.cancelOrder(id, customerEmail));
    }
}
