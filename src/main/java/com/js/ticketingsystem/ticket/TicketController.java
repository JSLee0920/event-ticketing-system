package com.js.ticketingsystem.ticket;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/scan")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<String> scanTicket(@RequestParam String token) {
        return ResponseEntity.ok(ticketService.scanTicket(token));
    }
}
