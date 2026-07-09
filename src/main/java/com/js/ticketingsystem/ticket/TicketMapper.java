package com.js.ticketingsystem.ticket;

import com.js.ticketingsystem.model.entities.Ticket;
import com.js.ticketingsystem.ticket.dtos.TicketResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TicketMapper {

    @Mapping(source = "id", target = "ticketId")
    @Mapping(source = "ticketType.name", target = "ticketTypeName")
    @Mapping(source = "ticketType.price", target = "price")
    @Mapping(source = "ticketType.event.id", target = "eventId")
    @Mapping(source = "ticketType.event.title", target = "eventTitle")
    @Mapping(source = "ticketType.event.startTime", target = "eventStartTime")
    @Mapping(source = "ticketType.event.venue.name", target = "venueName")
    TicketResponse toTicketResponse(Ticket ticket);
}
