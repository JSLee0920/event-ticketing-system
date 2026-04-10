package com.js.ticketingsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TicketingsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketingsystemApplication.class, args);
	}

}
