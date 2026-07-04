package com.js.ticketingsystem.repository;

import com.js.ticketingsystem.model.entities.Event;
import com.js.ticketingsystem.model.enums.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
    List<Event> findByStatus(EventStatus status);

    List<Event> findByOrganizerEmailOrderByStartTimeDesc(String email);
}
