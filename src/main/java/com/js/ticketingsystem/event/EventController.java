package com.js.ticketingsystem.event;

import com.js.ticketingsystem.event.dtos.EventCreateRequest;
import com.js.ticketingsystem.event.dtos.EventResponse;
import com.js.ticketingsystem.event.dtos.EventSummaryResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<EventSummaryResponse>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }
}
