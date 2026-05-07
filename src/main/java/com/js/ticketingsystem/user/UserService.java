package com.js.ticketingsystem.user;

import com.js.ticketingsystem.common.ResourceNotFoundException;
import com.js.ticketingsystem.model.entities.Event;
import com.js.ticketingsystem.model.entities.User;
import com.js.ticketingsystem.repository.EventRepository;
import com.js.ticketingsystem.repository.UserRepository;
import com.js.ticketingsystem.user.dtos.UserResponse;
import com.js.ticketingsystem.user.dtos.UserSummaryResponse;
import com.js.ticketingsystem.user.dtos.UserUpdateRequest;
import jakarta.transaction.Transactional;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final EventRepository eventRepository;

    public UserService(UserRepository userRepository, UserMapper userMapper, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.eventRepository = eventRepository;
    }

    // For All Logged-In Users
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toUserResponse(user);
    }

    @Transactional
    public UserResponse updateUserProfile(String email, UserUpdateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (request.name() != null && !request.name().isBlank()) {
            user.setName(request.name());
        }

        if (request.phoneNumber() != null && !request.phoneNumber().isBlank()) {
            user.setPhoneNum(request.phoneNumber());
        }

        User savedUser = userRepository.save(user);
        return userMapper.toUserResponse(savedUser);
    }

    // For organizer only
    public List<UserSummaryResponse> getAttendeesByEventId(UUID eventId, String organizerEmail) {
        User organizer = userRepository.findByEmail(organizerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Organizer not found"));

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        // Ownership check
        if (!event.getOrganizer().equals(organizer)) {
            throw new AccessDeniedException("You can only view attendees for your events");
        }

        List<User> attendees = userRepository.getAttendeesByEventId(eventId);
        return attendees.stream().map(userMapper::toUserSummaryResponse).toList();
    }

    // Staff
    public UserResponse getUserById(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        return userMapper.toUserResponse(user);
    }

    public List<UserSummaryResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserSummaryResponse)
                .toList();
    }
}
