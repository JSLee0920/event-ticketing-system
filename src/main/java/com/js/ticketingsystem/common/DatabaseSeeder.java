package com.js.ticketingsystem.common;

import com.js.ticketingsystem.model.entities.Category;
import com.js.ticketingsystem.model.entities.User;
import com.js.ticketingsystem.model.entities.Venue;
import com.js.ticketingsystem.model.enums.Role;
import com.js.ticketingsystem.repository.CategoryRepository;
import com.js.ticketingsystem.repository.UserRepository;
import com.js.ticketingsystem.repository.VenueRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VenueRepository venueRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository,
                          VenueRepository venueRepository,
                          CategoryRepository categoryRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.venueRepository = venueRepository;
        this.categoryRepository = categoryRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.findByEmail("staff@example.com").isEmpty()) {
            System.out.println("Seeding Users...");

            User staff = User.builder()
                    .name("System Staff")
                    .email("staff@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .phoneNum("0174561222")
                    .role(Role.STAFF)
                    .build();

            User organizer = User.builder()
                    .name("Event Organizer")
                    .email("organizer@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .phoneNum("0123451200")
                    .role(Role.ORGANIZER)
                    .build();

            User customer = User.builder()
                    .name("Regular Customer")
                    .email("customer@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .phoneNum("0135679999")
                    .role(Role.CUSTOMER)
                    .build();

            userRepository.saveAll(List.of(staff, organizer, customer));
        }

        if (venueRepository.count() == 0) {
            System.out.println("Seeding Venues...");
            Venue venue = Venue.builder()
                    .name("Neon City Arena")
                    .address("123 Cyberpunk Blvd")
                    .capacity(5000)
                    .build();
            venueRepository.save(venue);
        }

        if (categoryRepository.count() == 0) {
            System.out.println("Seeding Categories...");
            Category category = Category.builder()
                    .name("Technology")
                    .description("Tech conferences, hackathons, and meetups")
                    .build();
            categoryRepository.save(category);
        }

        System.out.println("Database Seeding Complete!");
    }
}
