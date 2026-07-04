package com.js.ticketingsystem.ticket;

import com.js.ticketingsystem.ticket.dtos.TicketResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<TicketResponse>> getMyTickets(
            @AuthenticationPrincipal(expression = "subject") String customerEmail
    ) {
        return ResponseEntity.ok(ticketService.getMyTickets(customerEmail));
    }

    @PostMapping("/scan")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<String> scanTicket(@RequestParam String token) {
        return ResponseEntity.ok(ticketService.scanTicket(token));
    }
}
