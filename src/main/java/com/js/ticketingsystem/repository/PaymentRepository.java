package com.js.ticketingsystem.repository;

import com.js.ticketingsystem.model.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
}
