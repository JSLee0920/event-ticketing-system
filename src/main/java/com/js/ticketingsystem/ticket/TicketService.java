package com.js.ticketingsystem.ticket;

import com.js.ticketingsystem.common.ResourceNotFoundException;
import com.js.ticketingsystem.model.entities.Ticket;
import com.js.ticketingsystem.model.enums.TicketStatus;
import com.js.ticketingsystem.repository.TicketRepository;
import com.js.ticketingsystem.ticket.dtos.TicketResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final TicketMapper ticketMapper;

    public TicketService(TicketRepository ticketRepository, TicketMapper ticketMapper) {
        this.ticketRepository = ticketRepository;
        this.ticketMapper = ticketMapper;
    }

    @Transactional
    public List<TicketResponse> getMyTickets(String customerEmail) {
        return ticketRepository.findByOrderCustomerEmailOrderByCreatedAtDesc(customerEmail)
                .stream()
                .map(ticketMapper::toTicketResponse)
                .toList();
    }

    @Transactional
    public String scanTicket(String ticketToken) {
        Ticket ticket = ticketRepository.findByTicketToken(ticketToken)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid ticket token. Ticket not found"));

        if (ticket.getStatus() == TicketStatus.SCANNED) {
            throw new IllegalArgumentException("This ticket was already scanned!");
        }

        if (ticket.getStatus() != TicketStatus.ISSUED) {
            throw new IllegalArgumentException("This ticket is not valid for entry (status: " + ticket.getStatus() + ")");
        }

        ticket.setStatus(TicketStatus.SCANNED);
        ticket.setScannedAt(LocalDateTime.now());
        ticketRepository.save(ticket);

        return "SUCCESS: Admit 1 (" + ticket.getTicketType().getName() + ") for " + ticket.getTicketType().getEvent().getTitle();
    }
}
