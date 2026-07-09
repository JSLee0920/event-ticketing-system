package com.js.ticketingsystem.ticket;

import com.js.ticketingsystem.ticket.dtos.ScanTicketRequest;
import com.js.ticketingsystem.ticket.dtos.TicketResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<String> scanTicket(@Valid @RequestBody ScanTicketRequest request) {
        return ResponseEntity.ok(ticketService.scanTicket(request.token()));
    }
}
