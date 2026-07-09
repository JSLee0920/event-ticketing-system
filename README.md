# Event Ticketing System Full-Stack Platform

> A full-stack event management platform featuring a highly concurrent Spring Boot backend engine and a modern,
> type-safe TanStack Start frontend powered by Bun.

Built with **Java 21**, **Spring Boot 3**, **PostgreSQL**, and **TanStack Start**, this platform handles the complex
business logic of a high-traffic ticketing system while delivering a blazing-fast, server-side rendered (SSR) user
experience. It features strict Role-Based Access Control (RBAC), robust inventory management, and enterprise-grade
security.

## Key Features

* **Type-Safe Full-Stack Integration:** Leverages **TanStack Start** for the frontend, utilizing server-side rendering (
  SSR) and strict type-safe routing to communicate seamlessly with the Java REST API.
* **Blazing Fast Frontend with Bun:** Uses Bun as the JavaScript runtime and package manager for near-instant dependency
  installations and lightning-fast dev server startups.
* **Concurrency Shield (Optimistic Locking):** Safely handles simultaneous checkout requests using Spring Data JPA
  `@Version` locking to prevent inventory overselling.
* **Secure Authentication:** Implements a custom Spring Security OAuth2 Resource Server utilizing **HTTP-Only, SameSite
  Strict cookies** for JWTs, effectively neutralizing XSS vulnerabilities across the full stack.
* **Role-Based Access Control (RBAC):** Distinct workflows for `CUSTOMER`, `ORGANIZER`, and `STAFF`.
* **Highly Normalized Database:** A deeply structured PostgreSQL schema tracking the exact lineage of an Event -> Ticket
  Type -> Ticket -> Order -> User.

## Tech Stack

* **Frontend:** TanStack Start, React, TypeScript, Tailwind CSS, **Bun**
* **Backend:** Java 21, Spring Boot 3.x (Web, Security, Data JPA, Validation)
* **Database:** PostgreSQL
* **Security:** Nimbus JOSE + JWT, BCrypt Password Encoder, HTTP-Only Cookies
* **Build Tool:** Maven / Bun

## Database Schema Summary

The architecture relies on a highly normalized relational model:

* `User`: Handles authentication and roles.
* `Event`: Core aggregate root for organizers.
* `TicketType`: Pricing tiers and total/available inventory management.
* `Ticket`: Unique, individually scannable entities generated post-purchase.
* `Order` & `Payment`: Transactional records linking customers to their generated tickets.

## Getting Started

### Prerequisites

* Bun v1+
* Java 21+
* PostgreSQL 16+

### Backend Setup

1. Create a PostgreSQL database named `event_ticket_db`.
2. Update `application.properties` with your database credentials.
3. Set up your RSA Private/Public keys for JWT signing in the `src/main/resources/certs` directory (or via environment
   variables).
4. Run the application: `./mvnw spring-boot:run`

### Frontend Setup (TanStack Start) (Yet to be implemented)

1. Navigate to the frontend directory.
2. Install dependencies: `bun install`
3. Start the development server: `bun run dev`

## Security Flow

1. Client (TanStack Start) sends credentials to `/api/auth/login`.
2. Spring Boot server verifies and generates an RSA-signed JWT.
3. Server attaches the JWT to the response as a secure, `HttpOnly` cookie.
4. Subsequent SSR or client-side fetches automatically include the cookie, parsed by the custom `BearerTokenResolver`.