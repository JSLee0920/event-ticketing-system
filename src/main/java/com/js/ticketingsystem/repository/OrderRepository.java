package com.js.ticketingsystem.repository;

import com.js.ticketingsystem.model.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
}
