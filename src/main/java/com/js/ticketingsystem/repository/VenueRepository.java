package com.js.ticketingsystem.repository;

import com.js.ticketingsystem.model.entities.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VenueRepository extends JpaRepository<Venue, UUID> {
    boolean existsByNameIgnoreCaseAndAddressIgnoreCase(String name, String address);
}
