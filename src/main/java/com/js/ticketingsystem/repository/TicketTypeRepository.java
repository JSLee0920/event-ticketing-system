package com.js.ticketingsystem.repository;

import com.js.ticketingsystem.model.entities.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TicketTypeRepository extends JpaRepository<TicketType, UUID> {
}
