package com.js.ticketingsystem.repository;

import com.js.ticketingsystem.model.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
