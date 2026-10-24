# StrangerConnect ⚡

> **Anonymous Random Text and Video Chat with Interest-Based Matchmaking**

StrangerConnect connects strangers with shared interests in real-time. Built with a modern dark theme, atomic Redis queue coordination, WebRTC peer-to-peer audio/video streaming, zero mandatory registration, and strict privacy by design.

---

## ✨ Features

- **🚀 Instant Anonymous Chat:** No registration, email, or passwords required. 256-bit cryptographically secure sessions generated on the fly.
- **🎯 Smart Interest Matchmaking:** Prioritizes strangers who love what you love using Jaccard similarity scoring with dynamic queue relaxation (0–10s strict, 10–20s overlap, 20s+ random fallback).
- **⚡ Atomic Concurrency:** Redis Lua scripts (`reserve_match.lua`) eliminate race conditions, duplicate matches, and ghost queue allocations.
- **🎥 WebRTC Video & Audio:** Direct peer-to-peer encrypted media streams decoupled completely from Socket.IO signaling.
- **🔒 Privacy by Design:** Routine text chats exist only in ephemeral memory during the active conversation; never stored to disk by default. Zero video recording.
- **🛡️ Integrated Safety:** 1-click **Next**, **Disconnect**, **Report**, and **Block** controls with Redis token-bucket rate limits and persistent exclusion.
- **🌙 Modern Dark UI:** Responsive slate/cyan interface with accessible contrast, smooth transitions, and keyboard shortcuts (<kbd>Esc</kbd> for Next).

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Lucide Icons |
| **Realtime Server** | Node.js, Socket.IO, Express, TypeScript |
| **Shared Contracts** | Zod schemas, TypeScript event definitions (`@strangerconnect/shared`) |
| **State & Queues** | Redis 7 (Sorted sets, Lua atomic transactions, sliding-window rate limits) |
| **Persistence** | PostgreSQL 16 (Anonymous sessions, blocks, reports, moderation actions) |
| **Media Transport** | WebRTC (RTCPeerConnection, STUN/TURN via Coturn) |
| **Testing** | Vitest (Unit & Multi-Client Integration) |
| **Orchestration** | Docker Compose |

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Shared Contracts
```bash
npm run build --workspace=packages/shared
```

### 3. Run Tests
```bash
# Run all unit and multi-client integration tests
npm run test
```

### 4. Start Development Servers
```bash
# In terminal 1: Start Realtime Server (port 4000)
npm run dev:realtime

# In terminal 2: Start Next.js Web App (port 3000)
npm run dev:web
```

Visit [http://localhost:3000](http://localhost:3000) in your browser!

---

## 🧪 Testing Summary

StrangerConnect includes automated test suites covering:
- **Shared Zod Schemas:** Payload validation, string bounds, and category schemas.
- **Session Service:** Cryptographic token generation, hashing, and cache revocation.
- **Matchmaking Engine:** Concurrent reservation, self-match prevention, and interest scoring.
- **Multi-Client E2E Chat:** 2 concurrent sockets joining queue, receiving match, sending messages, and handling Next skips.
- **WebRTC Signaling:** SDP Offer/Answer relay, ICE candidate relay, and unauthorized third-party packet rejection.
- **Moderation:** Token-bucket rate limiting and bidirectional block enforcement.

---

## 📚 Documentation

- [Architecture & Data Flow](docs/architecture.md)
- [Architecture Decision Records (ADRs)](docs/architecture-decisions.md)
- [Socket.IO Event Specification](docs/socket-events.md)
- [Implementation Plan](docs/implementation-plan.md)
- [Progress & Acceptance Checklist](docs/progress.md)
- [Deployment Guide](docs/deployment.md)

---

## 📜 License
MIT License.
