package com.js.ticketingsystem.ticket;

import com.js.ticketingsystem.common.ResourceNotFoundException;
import com.js.ticketingsystem.model.entities.Ticket;
import com.js.ticketingsystem.model.enums.TicketStatus;
import com.js.ticketingsystem.repository.TicketRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Transactional
    public String scanTicket(String ticketToken) {
        Ticket ticket = ticketRepository.findByTicketToken(ticketToken)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid ticket token. Ticket not found"));

        if (ticket.getStatus() == TicketStatus.SCANNED) {
            throw new IllegalArgumentException("This ticket was already scanned!");
        }

        ticket.setStatus(TicketStatus.SCANNED);
        ticket.setScannedAt(LocalDateTime.now());
        ticketRepository.save(ticket);

        return "SUCCESS: Admit 1 (" + ticket.getTicketType().getName() + ") for " + ticket.getTicketType().getEvent().getTitle();
    }
}
