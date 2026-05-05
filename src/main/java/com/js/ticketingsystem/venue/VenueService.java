package com.js.ticketingsystem.venue;

import com.js.ticketingsystem.model.entities.Venue;
import com.js.ticketingsystem.repository.VenueRepository;
import com.js.ticketingsystem.venue.dtos.VenueRequest;
import com.js.ticketingsystem.venue.dtos.VenueResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenueService {
    private final VenueRepository venueRepository;
    private final VenueMapper venueMapper;

    public VenueService(VenueRepository venueRepository, VenueMapper venueMapper) {
        this.venueRepository = venueRepository;
        this.venueMapper = venueMapper;
    }

    @Transactional
    public VenueResponse createVenue(VenueRequest request) {
        if (venueRepository.existsByNameIgnoreCaseAndAddressIgnoreCase(request.name(), request.address())) {
            throw new IllegalArgumentException("Venue with this name or address already exists");
        }

        Venue venue = Venue.builder()
                .name(request.name())
                .address(request.address())
                .capacity(request.capacity())
                .build();

        Venue savedVenue = venueRepository.save(venue);

        return venueMapper.toVenueResponse(savedVenue);
    }

    public List<VenueResponse> getAllVenues() {
        return venueRepository.findAll()
                .stream()
                .map(venueMapper::toVenueResponse)
                .toList();
    }
}
