package com.js.ticketingsystem.event;

import com.js.ticketingsystem.common.ResourceNotFoundException;
import com.js.ticketingsystem.event.dtos.EventCreateRequest;
import com.js.ticketingsystem.event.dtos.EventResponse;
import com.js.ticketingsystem.event.dtos.EventSummaryResponse;
import com.js.ticketingsystem.event.dtos.EventUpdateRequest;
import com.js.ticketingsystem.model.entities.Category;
import com.js.ticketingsystem.model.entities.Event;
import com.js.ticketingsystem.model.entities.User;
import com.js.ticketingsystem.model.entities.Venue;
import com.js.ticketingsystem.model.enums.EventStatus;
import com.js.ticketingsystem.repository.CategoryRepository;
import com.js.ticketingsystem.repository.EventRepository;
import com.js.ticketingsystem.repository.UserRepository;
import com.js.ticketingsystem.repository.VenueRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final VenueRepository venueRepository;
    private final CategoryRepository categoryRepository;
    private final EventMapper eventMapper;

    public EventService(EventRepository eventRepository, UserRepository userRepository,
                        VenueRepository venueRepository, CategoryRepository categoryRepository, EventMapper eventMapper) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.venueRepository = venueRepository;
        this.categoryRepository = categoryRepository;
        this.eventMapper = eventMapper;
    }

    @Transactional
    public EventResponse createEvent(EventCreateRequest request, String organizerEmail) {
        validateEventTimeRange(request.startTime(), request.endTime());

        User organizer = userRepository.findByEmail(organizerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Organizer not found"));
        Venue venue = venueRepository.findById(request.venueId())
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found"));
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Event event = Event.builder()
                .title(request.title())
                .description(request.description())
                .startTime(request.startTime())
                .endTime(request.endTime())
                .organizer(organizer)
                .venue(venue)
                .category(category)
                .status(EventStatus.DRAFT)
                .build();

        Event savedEvent = eventRepository.save(event);

        return eventMapper.toEventResponse(savedEvent);
    }

    public List<EventSummaryResponse> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .map(eventMapper::toEventSummaryResponse)
                .toList();
    }

    public EventResponse getEventById(UUID eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        return eventMapper.toEventResponse(event);
    }

    @Transactional
    public EventResponse updateEvent(UUID eventId, EventUpdateRequest request, String organizerEmail) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        // Check only owner can edit this file
        if (!event.getOrganizer().getEmail().equals(organizerEmail)) {
            throw new AccessDeniedException("You do not have permission to edit this event");
        }

        // Set the title, description and category
        if (request.title() != null) event.setTitle(request.title());
        if (request.description() != null) event.setDescription(request.description());

        if (request.categoryId() != null) {
            Category category = categoryRepository.findById(request.categoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            event.setCategory(category);
        }

        Event savedEvent = eventRepository.save(event);
        return eventMapper.toEventResponse(savedEvent);
    }

    @Transactional
    public EventResponse publishEvent(UUID eventId, String organizerEmail) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if (!event.getOrganizer().getEmail().equals(organizerEmail)) {
            throw new AccessDeniedException("You do not have permission to publish this event");
        }

        if (event.getStatus() != EventStatus.DRAFT) {
            throw new IllegalArgumentException("Only draft events can be published");
        }

        validateReadyToPublish(event);

        event.setStatus(EventStatus.PUBLISHED);
        return eventMapper.toEventResponse(eventRepository.save(event));
    }

    private void validateEventTimeRange(java.time.LocalDateTime startTime, java.time.LocalDateTime endTime) {
        if (!endTime.isAfter(startTime)) {
            throw new IllegalArgumentException("End time must be after start time");
        }
    }

    private void validateReadyToPublish(Event event) {
        if (event.getTitle() == null || event.getTitle().isBlank())
            throw new IllegalArgumentException("Title required");
        if (event.getStartTime() == null) throw new IllegalArgumentException("Start time required");
        if (event.getEndTime() == null) throw new IllegalArgumentException("End time required");
        if (!event.getEndTime().isAfter(event.getStartTime()))
            throw new IllegalArgumentException("End time must be after start time");
        if (event.getVenue() == null) throw new IllegalArgumentException("Venue required");
        if (event.getCategory() == null) throw new IllegalArgumentException("Category required");
    }
}
