# StrangerConnect — Architecture Decision Records (ADRs)

**Project:** StrangerConnect (Anonymous Random Text & Video Chat)  
**Status:** Approved for Implementation Planning  
**Last Updated:** 2026-10-25

---

## ADR-01: Monorepo Structure and Dependency Management

### Context
StrangerConnect requires a frontend web client (Next.js), a persistent real-time signaling & queue server (Node.js + Socket.IO), and shared contract definitions (types, event schemas, validation rules). We need a unified repository structure that supports fast local development, code sharing, and clean Dockerized deployments.

### Decision
Use **npm workspaces** within a root repository. 
Node.js v24.16.0 and npm 10.8.3 are natively installed on the host environment.
The repository layout follows:
```text
strangerconnect/
├── apps/
│   ├── web/               # Next.js 14+ (App Router), React, Tailwind CSS
│   └── realtime/          # Node.js, TypeScript, native HTTP + Socket.IO server
├── packages/
│   └── shared/            # Shared TypeScript types, Zod schemas, socket events
├── database/
│   ├── migrations/        # SQL migration files
│   └── seeds/             # Default interests and test fixtures
├── infra/
│   ├── docker/            # Dockerfiles and Coturn configuration
│   └── turn/              # STUN/TURN coturn.conf
├── docs/                  # Architectural docs, implementation plan, progress
├── docker-compose.yml     # Local orchestration (PostgreSQL, Redis, Coturn)
└── package.json           # Workspace definition
```

### Consequences & Trade-offs
- **Pros:** Zero third-party monorepo tool overhead (Turborepo/Lerna/pnpm not strictly required; standard npm workspaces keep the stack clean and minimal per ponytail principle).
- **Cons:** Package builds and references must use relative project references or workspace protocol (`workspace:*`).

---

## ADR-02: Real-time Signaling Decoupled from WebRTC Media Transport

### Context
Real-time random video chat apps frequently suffer from bandwidth bottlenecks, memory leaks, and high server costs if audio/video media is proxied through application servers.

### Decision
- **Socket.IO** is used strictly for signaling (SDP offer/answer exchange, ICE candidate exchange), queue coordination, session initialization, and text messaging.
- **WebRTC** carries all real-time audio and video peer-to-peer (or via TURN relay when NAT traversal requires it).
- **Zero audio/video data ever passes through Socket.IO or Node.js memory.**

### Consequences & Trade-offs
- **Pros:** Real-time server remains lightweight, horizontally scalable, and focused on low-latency state coordination.
- **Cons:** Media connectivity depends on client network topologies; requires Coturn (STUN/TURN) for symmetric NAT traversal.

---

## ADR-03: Atomic Matchmaking Engine with Redis Lua Scripting

### Context
Random matchmaking with shared interests is subject to high-concurrency race conditions:
1. Two matchmaking cycles picking the same user simultaneously.
2. A user clicking "Next" while already in the process of being paired.
3. Stale queue entries remaining after abrupt socket disconnects.

### Decision
Matchmaking logic is coordinated through Redis:
1. **Queue Structure:** Sorted sets (`ZSET`) or lists partitioned by mode (`queue:text`, `queue:video`, `queue:both`) scored by queue entry timestamp.
2. **Atomic Reservation:** An atomic **Redis Lua script** performs:
   - Verification that both candidates are currently in the queue.
   - Verification that neither candidate is currently assigned to an active match.
   - Dequeue of both participants.
   - Atomic creation of `match:{matchId}` with participants, mode, timestamp, and initial TTL.
   - Assignment of `session:{sessionId}:current_match = matchId`.
3. **Jaccard Similarity Scoring:**
   - Evaluated during worker matchmaking passes.
   - Dynamic relaxation: 0–10s strict interest match ($J > 0.3$), 10–20s at least 1 common interest ($J > 0$), 20s+ random fallback.
4. **Idempotent Next/Skip:** Cancels any in-flight queue entry before re-enqueuing.

### Consequences & Trade-offs
- **Pros:** Eliminates race conditions and duplicate match allocations without requiring distributed locks.
- **Cons:** Redis script execution must remain sub-millisecond; candidate filtering occurs in batches.

---

## ADR-04: Anonymous Session Security and Zero-Trust Event Validation

### Context
The application allows anonymous use without mandatory registration. However, anonymity must not compromise authorization, session isolation, or abuse protection.

### Decision
1. **Cryptographic Tokens:** Sessions are initiated via a server-generated cryptographically secure pseudo-random token (32-byte hex).
2. **Credential Storage:**
   - Client receives the session token (stored in Secure/SameSite HTTP-only cookie or memory token for websocket auth).
   - Server stores only the SHA-256 hash in PostgreSQL (`anonymous_sessions`) and Redis (`session:{id}`).
3. **Zero-Trust Message Dispatch:**
   - Every Socket.IO packet passes through a validation middleware and handler-level guard:
     - Verify socket belongs to an authenticated session ID.
     - Validate payload against Zod schema.
     - Verify session ID is a participant of the payload's `matchId`.
     - Verify match status is `active`.
   - The client never dictates peer IDs or room IDs; the server looks up the counterparty via `match:{matchId}`.

### Consequences & Trade-offs
- **Pros:** Prevents cross-room eavesdropping, token forgery, and ID spoofing.
- **Cons:** Requires a Redis lookup on incoming events; mitigated by sub-millisecond Redis response times.

---

## ADR-05: Ephemeral Messaging and Privacy Retention Policy

### Context
Privacy is paramount for anonymous chat platforms. Storing unflagged conversation transcripts creates high liability and contradicts user expectations.

### Decision
1. **In-Memory / Ephemeral Text Chat:**
   - Routine text messages are relayed immediately over Socket.IO and cached in Redis with match-lifetime TTL only to handle short reconnects.
   - Text chat messages are **never persisted to PostgreSQL** by default.
2. **Moderation Exception:**
   - When a user submits a formal report (`moderation:report`), recent messages in that specific match buffer may be sealed into a secure moderation evidence record with restricted administrative access and strict 30-day retention.
3. **No Audio/Video Retention:** Zero recording capabilities; direct peer-to-peer media streams are never tapped.

### Consequences & Trade-offs
- **Pros:** Clear privacy guarantees, low storage footprint, reduced regulatory burden (GDPR/ePrivacy).
- **Cons:** Retroactive abuse investigation is impossible unless reported while the match is active.

---

## ADR-06: WebRTC Connection Lifecycle and Stale Candidate Mitigation

### Context
In random video chat, users frequently click "Next" rapidly. WebRTC negotiation takes 500ms–2000ms. If a user skips mid-negotiation, delayed ICE candidates or SDP answers from `Match N-1` can arrive while the user is connecting to `Match N`.

### Decision
1. **Deterministic Offerer:** The participant whose `sessionId` is lexicographically smaller acts as the WebRTC offerer; the other acts as the answerer.
2. **Match Version Tagging:** Every WebRTC event payload must include `matchId`.
3. **Frontend Candidate Buffering:** 
   - ICE candidates received prior to `setRemoteDescription` are buffered in an array and flushed immediately after remote description is established.
4. **Immediate Teardown:**
   - On "Next", disconnect, or `match:ended`:
     - Stop all media stream tracks (`track.stop()`).
     - Detach `srcObject` from video elements.
     - Close `RTCPeerConnection`.
     - Invalidate buffered candidates and nullify peer connection instance.
     - Reject any subsequent signaling packets matching the old `matchId`.

### Consequences & Trade-offs
- **Pros:** Eliminates race conditions where video from a previous stranger briefly renders for the next stranger.
- **Cons:** Requires rigorous state management inside the `useWebRTC` hook.

---

## ADR-07: Moderation, Blocking, and Rate Limiting Architecture

### Context
Public anonymous chat platforms attract spam, harassment, and bot traffic. Defenses must operate at multiple layers: network, session, and operational.

### Decision
1. **Rate Limiting:** Redis sliding-window token bucket implemented via Lua/Redis commands for:
   - Queue joins: max 5/min.
   - Text messages: max 30/min, max 2000 chars/message.
   - WebRTC signaling: max 60/min.
   - Reports: max 5/10 min.
2. **Directional Blocking:**
   - When User A blocks User B, a persistent record is written to PostgreSQL `blocks` table and cached in Redis (`block:{userA}:{userB}`).
   - The matchmaking query filters out any candidate where a block exists in either direction.
3. **Temporary & Permanent Bans:**
   - Moderation actions record IP hashes (salted) and session IDs to prevent banned users from immediately re-entering queues.
