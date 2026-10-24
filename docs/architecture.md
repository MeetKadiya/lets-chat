# Let's Chat — System Architecture & Data Flow

Let's Chat is an anonymous random text and video chat web application prioritized by shared interests.

---

## 1. High-Level Architecture Diagram

```mermaid
flowchart TD
    subgraph Client["Browser Web Client (Next.js 14)"]
        UI["Chat & Landing UI (Tailwind CSS)"]
        RTC["WebRTC PeerConnection (useWebRTC)"]
        WS["Socket.IO Client (useSocket)"]
    end

    subgraph Edge["Edge & Networking"]
        Proxy["Reverse Proxy (Nginx / HTTPS / WSS)"]
        TURN["Coturn STUN/TURN Relay (UDP 3478)"]
    end

    subgraph Backend["Realtime Signaling Service (Node.js)"]
        IO["Socket.IO Server"]
        Auth["Session Service (Crypto Tokens)"]
        Match["Matchmaking Engine (Jaccard + Relaxation)"]
        Mod["Moderation Service (Rate Limits & Reports)"]
    end

    subgraph State["State & Persistence"]
        Redis[("Redis 7 (Queues, Active Matches, Rate Limits, Lua)")]
        PG[("PostgreSQL 16 (Sessions, Blocks, Reports, Moderation)")]
    end

    UI --> WS
    UI --> RTC
    WS -->|WSS| Proxy
    Proxy --> IO
    IO --> Auth
    IO --> Match
    IO --> Mod

    Match <-->|Atomic Lua| Redis
    Mod <-->|Sliding Window| Redis
    Auth <-->|Cache| Redis

    Auth -->|Persist| PG
    Match -->|Record Matches| PG
    Mod -->|Audit & Reports| PG

    RTC <-->|P2P Audio/Video (Direct ICE)| Client
    RTC -.->|Relay fallback| TURN
```

---

## 2. Core Architectural Principles

### 1. Strict Segregation of Media and Signaling
- **Signaling:** Handled via Socket.IO over secure WebSockets (WSS). Transports SDP offers/answers, ICE candidates, and queue state.
- **Media:** Audio and video streams **never proxy through Node.js**. Media travels directly between browsers via WebRTC (or Coturn TURN relay when NAT traversal requires it).

### 2. Atomic Matchmaking via Redis Lua
- Concurrency races (such as double-matching the same candidate) are eliminated by executing `reserve_match.lua` directly on Redis.
- Candidates are evaluated using Jaccard interest similarity $J(A, B) = |I_A \cap I_B| / |I_A \cup I_B|$ combined with wait-time fairness.
- Dynamic queue relaxation:
  - 0–10s: Strict interest overlap required.
  - 10–20s: Any single shared interest accepted.
  - 20s+: Random compatible match fallback.

### 3. Ephemeral Messaging & Privacy Standard
- Private chat messages exist in volatile memory and ephemeral Redis cache during the conversation.
- Once both users disconnect or skip, message buffers are purged.
- Unflagged conversations are **never stored on disk**.

### 4. Zero-Trust Identity Verification
- Clients never dictate match participants or room membership.
- Server validates that the sender's authenticated session belongs to the payload's `matchId` on every event.
