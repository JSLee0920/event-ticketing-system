package com.js.ticketingsystem.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "venue")
public class Venue {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "venue_id")
    private UUID id;

    @Column(nullable = false)
    private String name;

    private String address;

    private Integer capacity;

    @OneToMany(mappedBy = "venue", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<Event> events = new ArrayList<>();
}
