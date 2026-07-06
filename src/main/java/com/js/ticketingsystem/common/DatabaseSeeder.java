package com.js.ticketingsystem.common;

import com.js.ticketingsystem.model.entities.Category;
import com.js.ticketingsystem.model.entities.User;
import com.js.ticketingsystem.model.entities.Venue;
import com.js.ticketingsystem.model.enums.Role;
import com.js.ticketingsystem.repository.CategoryRepository;
import com.js.ticketingsystem.repository.UserRepository;
import com.js.ticketingsystem.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// Dev/local only: seeds demo data. Never active in prod so seeded credentials cannot become a backdoor.
@Component
@Profile({"local", "dev"})
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VenueRepository venueRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    // Password for the seeded demo accounts; override via app.seed.default-password in local config.
    @Value("${app.seed.default-password:password123}")
    private String seedPassword;

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

        System.out.println("Seeding Users...");
        seedUserIfMissing("System Staff", "staff@example.com", "0174561222", Role.STAFF);
        seedUserIfMissing("Event Organizer", "organizer@example.com", "0123451200", Role.ORGANIZER);
        seedUserIfMissing("Regular Customer", "customer@example.com", "0135679999", Role.CUSTOMER);

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

    // Seed each account independently so a missing organizer/customer is still created
    // even when staff already exists.
    private void seedUserIfMissing(String name, String email, String phoneNum, Role role) {
        if (userRepository.findByEmail(email).isEmpty()) {
            User user = User.builder()
                    .name(name)
                    .email(email)
                    .password(passwordEncoder.encode(seedPassword))
                    .phoneNum(phoneNum)
                    .role(role)
                    .build();
            userRepository.save(user);
        }
    }
}
