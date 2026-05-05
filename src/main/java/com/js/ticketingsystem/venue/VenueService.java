package com.js.ticketingsystem.venue;

import com.js.ticketingsystem.repository.VenueRepository;
import org.springframework.stereotype.Service;

@Service
public class VenueService {
    private final VenueRepository venueRepository;

    public VenueService(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }
}
