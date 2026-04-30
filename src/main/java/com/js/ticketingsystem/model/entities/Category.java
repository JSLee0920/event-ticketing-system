package com.js.ticketingsystem.model.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "categories")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "category_id")
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name;

    @Builder.Default
    @OneToMany(mappedBy = "category")
    private List<Event> events = new ArrayList<>();
}

