package com.js.ticketingsystem.repository;

import com.js.ticketingsystem.model.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {
    Optional<Ticket> findByTicketToken(String ticketToken);
}
