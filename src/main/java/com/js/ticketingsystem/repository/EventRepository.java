package com.js.ticketingsystem.repository;

import com.js.ticketingsystem.model.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {

}
