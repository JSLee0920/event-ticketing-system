package com.js.ticketingsystem.order;

import com.js.ticketingsystem.common.ResourceNotFoundException;
import com.js.ticketingsystem.model.entities.Order;
import com.js.ticketingsystem.model.entities.Payment;
import com.js.ticketingsystem.model.enums.OrderStatus;
import com.js.ticketingsystem.model.enums.PaymentStatus;
import com.js.ticketingsystem.repository.OrderRepository;
import com.js.ticketingsystem.repository.PaymentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PaymentService {
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    public PaymentService(OrderRepository orderRepository, PaymentRepository paymentRepository) {
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
    }

    @Transactional
    public String processMockPayment(UUID orderId, String paymentMethod) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalArgumentException("This order has already been processed or cancelled.");
        }

        // --- MOCK EXTERNAL API CALL HERE ---
        boolean paymentSuccess = true;
        // -----------------------------------

        if (paymentSuccess) {
            // Create the Payment Record
            Payment payment = Payment.builder()
                    .order(order)
                    .amount(order.getTotalAmount())
                    .paymentDate(LocalDateTime.now())
                    .paymentMethod(paymentMethod) // e.g., "CREDIT_CARD"
                    .status(PaymentStatus.SUCCESS)
                    .transactionId("txn_" + UUID.randomUUID().toString().substring(0, 8))
                    .build();

            paymentRepository.save(payment);

            // Mark the Order as CONFIRMED
            order.setStatus(OrderStatus.CONFIRMED);
            orderRepository.save(order);

            return "Payment successful! Transaction ID: " + payment.getTransactionId();
        } else {
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
            throw new IllegalArgumentException("Payment failed. Order cancelled.");
        }
    }
}
