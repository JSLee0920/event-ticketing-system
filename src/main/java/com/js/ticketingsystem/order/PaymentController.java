package com.js.ticketingsystem.order;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Example request body: { "paymentMethod": "CREDIT_CARD", "cardNumber": "1234..." }
    // For now, we will just pass the method as a query param for the mock
    @PostMapping("/{orderId}/pay")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<String> payForOrder(
            @PathVariable UUID orderId,
            @RequestParam(defaultValue = "CREDIT_CARD") String paymentMethod,
            @AuthenticationPrincipal(expression = "subject") String customerEmail) {

        return ResponseEntity.ok(paymentService.processMockPayment(orderId, paymentMethod, customerEmail));
    }
}