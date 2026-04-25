package com.js.ticketingsystem.repository;

import com.js.ticketingsystem.model.entities.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository extends JpaRepository<Venue, Long> {
}
