package com.js.ticketingsystem.event;

import com.js.ticketingsystem.event.dtos.EventCreateRequest;
import com.js.ticketingsystem.event.dtos.EventResponse;
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
import org.springframework.stereotype.Service;

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
        User organizer = userRepository.findByEmail(organizerEmail)
                .orElseThrow(() -> new IllegalArgumentException("Organizer not found"));
        Venue venue = venueRepository.findById(request.venueId())
                .orElseThrow(() -> new IllegalArgumentException(("Venue not found")));
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        Event event = Event.builder()
                .title(request.title())
                .description(request.description())
                .startTime(request.startTime())
                .endTime(request.endTime())
                .organizer(organizer)
                .venue(venue)
                .category(category)
                .status(EventStatus.PUBLISHED)
                .build();

        Event savedEvent = eventRepository.save(event);

        return eventMapper.toEventResponse(savedEvent);
    }
}
