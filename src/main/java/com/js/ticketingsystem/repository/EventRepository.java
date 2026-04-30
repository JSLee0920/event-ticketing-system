package com.js.ticketingsystem.repository;

import com.js.ticketingsystem.model.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {

}
