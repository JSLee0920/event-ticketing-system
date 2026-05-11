package com.js.ticketingsystem.order;

import com.js.ticketingsystem.order.dtos.OrderCreateRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<String> createOrder(
            @Valid @RequestBody OrderCreateRequest request,
            @AuthenticationPrincipal(expression = "subject") String customerEmail
    ) {
        String orderId = orderService.createPendingOrder(request, customerEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body("Order created successfully, Order ID: " + orderId);
    }
}
