package com.js.ticketingsystem.event;

import com.js.ticketingsystem.event.dtos.EventCreateRequest;
import com.js.ticketingsystem.event.dtos.EventResponse;
import com.js.ticketingsystem.event.dtos.EventSummaryResponse;
import com.js.ticketingsystem.event.dtos.EventUpdateRequest;
import com.js.ticketingsystem.user.UserService;
import com.js.ticketingsystem.user.dtos.UserSummaryResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final UserService userService;

    public EventController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ORGANIZER')")
    public ResponseEntity<EventResponse> createEvent(
            @Valid @RequestBody EventCreateRequest request,
            @AuthenticationPrincipal(expression = "subject") String organizerEmail) {
        EventResponse response = eventService.createEvent(request, organizerEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @PostMapping("/{id}/publish")
    @PreAuthorize("hasRole('ORGANIZER')")
    public ResponseEntity<EventResponse> publishEvent(
            @PathVariable UUID id,
            @AuthenticationPrincipal(expression = "subject") String organizerEmail) {
        return ResponseEntity.ok(eventService.publishEvent(id, organizerEmail));
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
    @PreAuthorize("hasRole('ORGANIZER')")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable UUID id,
            @Valid @RequestBody EventUpdateRequest request, @AuthenticationPrincipal(expression = "subject") String organizerEmail) {
        return ResponseEntity.ok(eventService.updateEvent(id, request, organizerEmail));
    }

    @GetMapping("/{id}/attendees")
    @PreAuthorize("hasRole('ORGANIZER')")
    public ResponseEntity<List<UserSummaryResponse>> getEventAttendees(
            @PathVariable UUID eventId,
            @AuthenticationPrincipal(expression = "subject") String email
    ) {
        return ResponseEntity.ok(userService.getAttendeesByEventId(eventId, email));
    }
}
