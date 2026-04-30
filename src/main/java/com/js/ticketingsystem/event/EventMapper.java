package com.js.ticketingsystem.event;

import com.js.ticketingsystem.event.dtos.EventResponse;
import com.js.ticketingsystem.event.dtos.EventSummaryResponse;
import com.js.ticketingsystem.model.entities.Event;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EventMapper {

    @Mapping(source = "venue.name", target = "venueName")
    @Mapping(source = "organizer.name", target = "organizerName")
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "id", target = "eventId")
    EventResponse toEventResponse(Event event);

    @Mapping(source = "venue.name", target = "venueName")
    @Mapping(source = "id", target = "eventId")
    EventSummaryResponse toEventSummaryResponse(Event event);
}
