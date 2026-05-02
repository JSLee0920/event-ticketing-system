package com.js.ticketingsystem.event;

import com.js.ticketingsystem.event.dtos.EventCreateRequest;
import com.js.ticketingsystem.event.dtos.EventResponse;
import com.js.ticketingsystem.event.dtos.EventSummaryResponse;
import com.js.ticketingsystem.event.dtos.EventUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    private EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @Valid @RequestBody EventCreateRequest request,
            @AuthenticationPrincipal(expression = "subject") String organizerEmail) {
        EventResponse response = eventService.createEvent(request, organizerEmail);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EventSummaryResponse>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable UUID id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable UUID id,
            @Valid @RequestBody EventUpdateRequest request, @AuthenticationPrincipal(expression = "subject") String organizerEmail) {
        return ResponseEntity.ok(eventService.updateEvent(id, request, organizerEmail));
    }
}
