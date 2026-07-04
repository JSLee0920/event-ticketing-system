package com.js.ticketingsystem.repository;

import com.js.ticketingsystem.model.entities.Order;
import com.js.ticketingsystem.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByCustomerEmailOrderByOrderDateDesc(String email);

    List<Order> findByStatusAndOrderDateBefore(OrderStatus status, LocalDateTime cutoff);
}
