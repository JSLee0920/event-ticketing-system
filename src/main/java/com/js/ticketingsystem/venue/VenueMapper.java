package com.js.ticketingsystem.venue;

import com.js.ticketingsystem.model.entities.Venue;
import com.js.ticketingsystem.venue.dtos.VenueResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VenueMapper {
    VenueResponse toVenueResponse(Venue venue);
}
