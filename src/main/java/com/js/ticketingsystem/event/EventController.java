package com.js.ticketingsystem.event;

import com.js.ticketingsystem.event.dtos.EventCreateRequest;
import com.js.ticketingsystem.event.dtos.EventResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    private EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @RequestBody EventCreateRequest request,
            @AuthenticationPrincipal(expression = "subject") String organizerEmail) {
        EventResponse response = eventService.createEvent(request, organizerEmail);
        return ResponseEntity.ok(response);
    }
}
