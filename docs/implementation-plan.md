# StrangerConnect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify StrangerConnect, a modern, production-grade anonymous text and video chat application with interest-based atomic matchmaking, WebRTC peer-to-peer media, PostgreSQL persistence, and Redis queue coordination.

**Architecture:** The frontend (Next.js 14+ App Router, Tailwind CSS) communicates with a standalone real-time signaling and queue server (Node.js + Socket.IO) over WebSockets. Transient state (queues, active matches, rate limits) is atomically managed in Redis using Lua scripts, while persistent records (sessions, blocks, reports, moderation) are stored in PostgreSQL. WebRTC handles peer-to-peer audio/video streaming via STUN/TURN, entirely decoupled from Socket.IO message traffic.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Node.js, Socket.IO, PostgreSQL, Redis, WebRTC, Coturn, Zod, Vitest, Playwright, Docker Compose.

**Spec:** [strangerconnect_project_spec.md](file:///I:/Videos/Video%201/strangerconnect_project_spec.md)

---

## Global Constraints

- **Dependency Versions:** Node.js v24+, React 18/19, Next.js 14+, Socket.IO v4.7+, Zod 3.22+, Vitest 1.4+.
- **Media Segregation:** Never stream audio or video through Socket.IO; Socket.IO is strictly for signaling, queue state, and text.
- **Privacy Standard:** Private chat transcripts and media are never stored to persistent disk by default.
- **Zero-Trust Identity:** The server is authoritative on all match assignments, counterparty lookups, and session tokens. Client-provided match participant IDs are never trusted.
- **Atomicity:** All matchmaking reservations must be executed atomically via Redis Lua scripts to eliminate race conditions and double-matching.
- **Ponytail Dev Standard:** Smallest clean change that satisfies requirements; eliminate unnecessary boilerplate and wrapper abstractions.

---

## Review Focus

1. **Delayed ICE Candidates & SDP:** An ICE candidate or SDP packet from a skipped match arriving after a new match has started must be discarded without breaking negotiation.
2. **Concurrent Matchmaking Race:** Two worker ticks or simultaneous user queue joins must never assign the same user to two different matches.
3. **Camera Permission Denial Graceful Fallback:** If a user denies camera/mic access in video mode, the application must present a clear error notification and allow continued text chat without crashing.
4. **Sudden Socket Disconnection / Ghost Queues:** An unexpected browser close or network drop must immediately de-queue the user and cleanly notify the remaining peer with `peer:status` or `match:ended`.
5. **Rate-Limit & Payload Flooding:** Rapid text spam, oversized messages (>2000 chars), or malformed signaling packets must be rejected at the Socket.IO middleware layer without crashing the Node.js event loop.

---

## Phase B: Foundation & Infrastructure

### Task 1: Monorepo Setup & Workspace Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `apps/realtime/package.json`
- Create: `apps/realtime/tsconfig.json`
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`

**Interfaces:**
- Produces: Root npm workspace orchestration linking `apps/web`, `apps/realtime`, and `packages/shared`.

- [ ] **Step 1: Write root workspace and package manifests**
  Configure npm workspaces: `["apps/*", "packages/*"]` with common dev scripts (`dev`, `build`, `test`, `lint`).
- [ ] **Step 2: Create root tsconfig.json with base compiler options**
  Target ES2022, module NodeNext, strict mode enabled.
- [ ] **Step 3: Verify workspace linking**
  Run: `npm install`
  Expected: Clean install with symlinks to `packages/shared`.
- [ ] **Step 4: Commit initial monorepo structure**
  `git init && git add . && git commit -m "chore: initialize monorepo with npm workspaces"`

---

### Task 2: Shared Contracts, Event Schemas & Types (`packages/shared`)

**Files:**
- Create: `packages/shared/src/events.ts`
- Create: `packages/shared/src/schemas.ts`
- Create: `packages/shared/src/types.ts`
- Create: `packages/shared/src/index.ts`
- Create: `packages/shared/tests/schemas.test.ts`

**Interfaces:**
- Produces:
  - `ClientToServerEvents`, `ServerToClientEvents` TypeScript type definitions.
  - Zod schemas: `SessionInitSchema`, `QueueJoinSchema`, `QueueCancelSchema`, `MatchAckSchema`, `ChatSendSchema`, `MatchNextSchema`, `MatchLeaveSchema`, `WebRtcOfferSchema`, `WebRtcAnswerSchema`, `WebRtcIceSchema`, `ReportSchema`, `BlockSchema`.
  - Enums/types for `ChatMode` (`text`, `video`, `both`), `MatchStatus`, `ReportCategory`.

- [ ] **Step 1: Write unit tests for Zod schemas in `packages/shared/tests/schemas.test.ts`**
  Verify valid payloads pass and invalid payloads (e.g. text > 2000 chars, empty category) fail validation.
- [ ] **Step 2: Run test to verify it fails**
  Run: `npm run test --workspace=packages/shared`
  Expected: FAIL (modules missing).
- [ ] **Step 3: Implement Zod schemas, types, and event definitions**
  Implement `events.ts`, `schemas.ts`, `types.ts`, and export via `index.ts`.
- [ ] **Step 4: Run test to verify it passes**
  Run: `npm run test --workspace=packages/shared`
  Expected: PASS (all schema validation tests pass).
- [ ] **Step 5: Commit**
  `git add packages/shared && git commit -m "feat(shared): implement schemas and event contracts"`

---

### Task 3: Local Infrastructure & Docker Compose Setup

**Files:**
- Create: `docker-compose.yml`
- Create: `infra/turn/turnserver.conf`
- Create: `database/migrations/001_initial_schema.sql`
- Create: `database/seeds/001_default_interests.sql`
- Create: `apps/realtime/src/config/env.ts`

**Interfaces:**
- Produces: Running Docker Compose containers for PostgreSQL (port 5432), Redis (port 6379), and Coturn (port 3478).
- Consumes: Environment variables from `.env`.

- [ ] **Step 1: Create `docker-compose.yml` for PostgreSQL, Redis, and Coturn**
  Configure healthchecks, persistent volumes, and port mappings.
- [ ] **Step 2: Write initial PostgreSQL migration SQL**
  Create tables: `anonymous_sessions`, `interests`, `session_interests`, `matches`, `blocks`, `reports`, `moderation_actions` with all foreign keys, unique constraints, and check constraints per Section 6 of spec.
- [ ] **Step 3: Write seed script for default interests**
  Seed `gaming`, `music`, `anime`, `movies`, `technology`, `sports`.
- [ ] **Step 4: Spin up Docker Compose services and verify database readiness**
  Run: `docker compose up -d postgres redis`
  Verify: `docker compose ps` shows healthy services.
- [ ] **Step 5: Apply database migrations and seeds**
  Execute migration SQL on PostgreSQL container and verify table existence.
- [ ] **Step 6: Commit**
  `git add docker-compose.yml infra database && git commit -m "feat(infra): add docker-compose, postgres migrations, and seed data"`

---

### Task 4: Real-time Server Foundation & Health Checks (`apps/realtime`)

**Files:**
- Create: `apps/realtime/src/server.ts`
- Create: `apps/realtime/src/config/redis.ts`
- Create: `apps/realtime/src/config/db.ts`
- Create: `apps/realtime/src/middleware/auth.middleware.ts`
- Create: `apps/realtime/src/middleware/rate-limit.middleware.ts`
- Create: `apps/realtime/tests/health.test.ts`

**Interfaces:**
- Produces: HTTP Server with `/health` endpoint and Socket.IO server bound with Redis client and PostgreSQL pool.
- Consumes: `packages/shared`.

- [ ] **Step 1: Write integration test for `/health` endpoint and Socket.IO connection**
  Test HTTP `GET /health` returns `{ status: "ok", redis: "connected", postgres: "connected" }`.
- [ ] **Step 2: Run test to verify failure**
  Run: `npm run test --workspace=apps/realtime`
- [ ] **Step 3: Implement database pool, redis client, and server bootstrap**
  Implement `server.ts` with graceful shutdown, CORS allowlist, and ping/pong health diagnostics.
- [ ] **Step 4: Verify test passes**
  Run: `npm run test --workspace=apps/realtime`
- [ ] **Step 5: Commit**
  `git add apps/realtime && git commit -m "feat(realtime): bootstrap server with health endpoints and redis/postgres connections"`

---

## Phase C: Text Chat & Atomic Matchmaking

### Task 5: Anonymous Session Management Service

**Files:**
- Create: `apps/realtime/src/services/session.service.ts`
- Create: `apps/realtime/src/repositories/session.repository.ts`
- Create: `apps/realtime/tests/session.service.test.ts`

**Interfaces:**
- Produces: `createSession()`, `validateSessionToken(token)`, `touchSession(sessionId)`, `revokeSession(sessionId)`.
- Consumes: PostgreSQL `anonymous_sessions` and Redis `session:{id}`.

- [ ] **Step 1: Write test for session token generation, hashing, and retrieval**
  Verify token hash is stored, plain token is never stored in DB, expiry is checked correctly.
- [ ] **Step 2: Implement session repository and service**
  Use `crypto.randomBytes(32)` for secure token generation, `crypto.createHash('sha256')` for hashing.
- [ ] **Step 3: Verify test passes**
- [ ] **Step 4: Commit**
  `git commit -m "feat(realtime): anonymous session token generation and verification"`

---

### Task 6: Atomic Redis Matchmaking Engine

**Files:**
- Create: `apps/realtime/src/services/matchmaking.service.ts`
- Create: `apps/realtime/src/scripts/reserve_match.lua`
- Create: `apps/realtime/tests/matchmaking.test.ts`

**Interfaces:**
- Produces: `joinQueue(session, preferences)`, `cancelQueue(session)`, `executeMatchCycle()`, `leaveMatch(session, matchId)`.
- Consumes: Redis Lua script `reserve_match.lua`.

- [ ] **Step 1: Write test for concurrent matchmaking reservation**
  Simulate 10 concurrent requests to pair users. Verify:
  - No user is matched to themselves.
  - No user is assigned to more than 1 active match.
  - Jaccard similarity prioritizes users with matching interests.
  - Blocked users are never matched.
- [ ] **Step 2: Implement atomic Lua script `reserve_match.lua`**
  Verify queue membership, active match status, remove from queue, write `match:{matchId}`, and bind session keys atomically.
- [ ] **Step 3: Implement MatchmakingService with queue relaxation**
  Implement dynamic interest relaxation (0–10s strict, 10–20s relaxed, 20s+ fallback).
- [ ] **Step 4: Run matchmaking concurrency tests**
  Run: `npm run test --workspace=apps/realtime matchmaking.test.ts`
  Expected: PASS with 100% atomic isolation under load.
- [ ] **Step 5: Commit**
  `git commit -m "feat(realtime): atomic matchmaking engine with redis lua and interest scoring"`

---

### Task 7: Real-Time Socket.IO Handlers & Text Chat Lifecycle

**Files:**
- Create: `apps/realtime/src/sockets/session.handlers.ts`
- Create: `apps/realtime/src/sockets/queue.handlers.ts`
- Create: `apps/realtime/src/sockets/chat.handlers.ts`
- Create: `apps/realtime/src/services/cleanup.service.ts`
- Create: `apps/realtime/tests/chat.e2e.test.ts`

**Interfaces:**
- Produces: Handlers for `session:init`, `queue:join`, `queue:cancel`, `match:ack`, `chat:send`, `match:next`, `match:leave`, `disconnect`.

- [ ] **Step 1: Write integration test with two Socket.IO client connections**
  Connect Client 1 and Client 2 -> join queue -> receive `match:found` -> exchange `chat:message` -> Client 1 sends `match:next` -> both receive `match:ended` -> Client 1 re-enqueued.
- [ ] **Step 2: Implement Socket.IO handlers with validation middleware**
  Enforce Zod payload schemas, verify session ownership of `matchId`, relay messages to counterparty socket room.
- [ ] **Step 3: Implement cleanup service**
  Handle unexpected socket disconnects, purge queues, emit peer disconnect status.
- [ ] **Step 4: Run integration tests**
  Expected: PASS.
- [ ] **Step 5: Commit**
  `git commit -m "feat(realtime): socket.io handlers for queueing, text chat, and lifecycle"`

---

### Task 8: Next.js Frontend — Landing Page & Text Chat UI (`apps/web`)

**Files:**
- Create: `apps/web/app/layout.tsx`
- Create: `apps/web/app/page.tsx`
- Create: `apps/web/app/chat/page.tsx`
- Create: `apps/web/components/landing/HeroSection.tsx`
- Create: `apps/web/components/landing/InterestPicker.tsx`
- Create: `apps/web/components/chat/ChatContainer.tsx`
- Create: `apps/web/components/chat/MessageList.tsx`
- Create: `apps/web/components/chat/MessageInput.tsx`
- Create: `apps/web/components/chat/ChatControls.tsx`
- Create: `apps/web/components/chat/StatusBanner.tsx`
- Create: `apps/web/hooks/useSocket.ts`
- Create: `apps/web/hooks/useChatSession.ts`

**Interfaces:**
- Produces: Complete responsive dark-theme landing page and text chat interface with interest tags, message log, action buttons (Next, Stop, Report, Block).

- [ ] **Step 1: Set up Next.js app with Tailwind CSS dark theme**
  Configure Tailwind theme colors (deep slate/charcoal backgrounds, accessible high-contrast text, accent indigo/cyan).
- [ ] **Step 2: Implement `useSocket` and `useChatSession` hooks**
  Manage socket lifecycle, automatic reconnect, session persistence in localStorage/cookie, state transitions (`IDLE`, `QUEUED`, `MATCHED`, `CONNECTING`, `CHATTING`, `ENDED`).
- [ ] **Step 3: Implement landing page components with interest selection**
  Provide mode selection (text / video / both), preset interest chips, custom interest entry.
- [ ] **Step 4: Implement chat screen components**
  Message history with timestamps, status announcements ("You're now chatting with a stranger who likes gaming"), auto-scrolling input box.
- [ ] **Step 5: Test in browser**
  Verify two browser windows can connect, match, and chat in real-time.
- [ ] **Step 6: Commit**
  `git commit -m "feat(web): landing page, interest selection, and real-time text chat UI"`

---

## Phase D: Video Calling & WebRTC

### Task 9: Real-time WebRTC Signaling Handlers

**Files:**
- Create: `apps/realtime/src/sockets/webrtc.handlers.ts`
- Create: `apps/realtime/tests/webrtc.signaling.test.ts`

**Interfaces:**
- Produces: Signaling relays for `webrtc:offer`, `webrtc:answer`, `webrtc:ice` with match-validation and candidate size constraints.

- [ ] **Step 1: Write test for WebRTC signaling validation**
  Verify: Non-participant cannot send signaling packets; offer/answer payload must be valid SDP; oversized ICE candidates rejected.
- [ ] **Step 2: Implement `webrtc.handlers.ts`**
  Relay offer/answer/candidate only to the verified counterparty socket in the active `matchId`.
- [ ] **Step 3: Run signaling tests**
  Expected: PASS.
- [ ] **Step 4: Commit**
  `git commit -m "feat(realtime): secure webrtc signaling event handlers"`

---

### Task 10: Frontend WebRTC Hook & Video Panels (`apps/web`)

**Files:**
- Create: `apps/web/hooks/useWebRTC.ts`
- Create: `apps/web/components/video/VideoContainer.tsx`
- Create: `apps/web/components/video/VideoPanel.tsx`
- Create: `apps/web/components/video/MediaControls.tsx`
- Create: `apps/web/components/video/PermissionErrorModal.tsx`

**Interfaces:**
- Produces: `useWebRTC` hook managing `RTCPeerConnection`, deterministic offerer logic (`isOfferer = mySessionId < peerSessionId`), ICE candidate queue, local/remote media tracks, mic/cam mute toggles, clean teardown.

- [ ] **Step 1: Implement `useWebRTC` hook**
  - Obtain user media on demand (`navigator.mediaDevices.getUserMedia`).
  - Configure STUN/TURN servers.
  - Buffer ICE candidates until `setRemoteDescription` completes.
  - Add track event listeners to assign remote stream to remote video element.
  - Teardown: stop all tracks, close peer connection, nullify streams on unmount or Next.
- [ ] **Step 2: Implement video components**
  Side-by-side or picture-in-picture responsive layout; overlay badges for connection quality; mic mute and camera toggle buttons.
- [ ] **Step 3: Implement graceful permission denial handling**
  If `NotAllowedError` or `NotFoundError` occurs, surface non-blocking alert allowing user to stay in text chat.
- [ ] **Step 4: Verify WebRTC calling between two browser contexts**
  Test video exchange locally with simulated webcam or loopback streams.
- [ ] **Step 5: Commit**
  `git commit -m "feat(web): webrtc hook, video panels, media controls, and cleanup"`

---

## Phase E: Safety, Moderation & Privacy

### Task 11: Reporting, Blocking & Moderation Services

**Files:**
- Create: `apps/realtime/src/services/moderation.service.ts`
- Create: `apps/realtime/src/repositories/moderation.repository.ts`
- Create: `apps/realtime/src/sockets/moderation.handlers.ts`
- Create: `apps/realtime/tests/moderation.test.ts`
- Create: `apps/web/components/moderation/ReportModal.tsx`
- Create: `apps/web/components/moderation/BlockConfirmationModal.tsx`
- Create: `apps/web/app/safety/page.tsx`
- Create: `apps/web/app/privacy/page.tsx`

**Interfaces:**
- Produces: Complete reporting and blocking workflow, rate-limited report submission, persistent block checks in matchmaking, safety guidelines and privacy policy pages.

- [ ] **Step 1: Write tests for block enforcement in matchmaking**
  Verify: After User A blocks User B, matchmaking engine never pairs User A and User B again.
- [ ] **Step 2: Implement moderation repository and service**
  Insert into PostgreSQL `reports` and `blocks`; write block cache to Redis.
- [ ] **Step 3: Implement frontend Report and Block modals**
  Include category selection (spam, harassment, nudity, other), optional description, and instant feedback.
- [ ] **Step 4: Create Privacy Policy and Safety Guidelines pages**
  Detail zero-transcript retention, temporary moderation logs, minimum age policy (18+), and guidelines.
- [ ] **Step 5: Verify test passes and commit**
  `git commit -m "feat(safety): report and block workflows, rate limits, and policy pages"`

---

## Phase F: Production Readiness & Quality Assurance

### Task 12: Comprehensive Automated Tests (Unit, Integration & Playwright E2E)

**Files:**
- Create: `apps/web/playwright.config.ts`
- Create: `apps/web/tests/e2e/matchmaking-and-chat.spec.ts`
- Create: `apps/web/tests/e2e/webrtc-call.spec.ts`
- Create: `apps/web/tests/e2e/report-and-block.spec.ts`

**Interfaces:**
- Produces: Fully automated end-to-end test suite launching two independent browser contexts in Chromium to simulate real strangers.

- [ ] **Step 1: Configure Playwright for multi-browser context testing**
  Enable fake media streams (`--use-fake-ui-for-media-stream`, `--use-fake-device-for-media-stream`).
- [ ] **Step 2: Write E2E test for text chat matchmaking and Next skipping**
  Two tabs join queue -> match verified -> messages exchanged -> Next clicked -> second match verified.
- [ ] **Step 3: Write E2E test for WebRTC call connection**
  Verify remote video element receives active media stream in both contexts.
- [ ] **Step 4: Run Playwright tests**
  Run: `npm run test:e2e`
  Expected: All E2E tests pass.
- [ ] **Step 5: Commit**
  `git commit -m "test: add playwright multi-context e2e tests for matchmaking, chat, and video"`

---

### Task 13: Production Dockerfile & CI Pipeline Setup

**Files:**
- Create: `apps/web/Dockerfile`
- Create: `apps/realtime/Dockerfile`
- Create: `docker-compose.prod.yml`
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Produces: Production multi-stage Dockerfiles with unprivileged users, automated CI lint, test, and typecheck workflows.

- [ ] **Step 1: Create optimized multi-stage Dockerfiles for `web` and `realtime`**
- [ ] **Step 2: Create `docker-compose.prod.yml` with production settings and healthchecks**
- [ ] **Step 3: Create GitHub Actions workflow (`ci.yml`)**
  Run typecheck, lint, unit tests, and build checks on pull requests.
- [ ] **Step 4: Verify Docker builds locally**
  Run: `docker compose -f docker-compose.prod.yml build`
- [ ] **Step 5: Commit**
  `git commit -m "ci(docker): add production dockerfiles and ci workflow"`

---

## Phase G: Final Verification & Handover

### Task 14: Verification Checklist & System Documentation

**Files:**
- Create: `docs/architecture.md`
- Create: `docs/socket-events.md`
- Create: `docs/deployment.md`
- Create: `docs/verification-report.md`
- Create: `README.md`

**Interfaces:**
- Produces: Complete architectural diagrams, event documentation, deployment instructions, and final verification report.

- [ ] **Step 1: Run complete test suite (unit, integration, e2e)**
- [ ] **Step 2: Verify zero ESLint/TypeScript errors across all workspaces**
- [ ] **Step 3: Write comprehensive `README.md` and documentation**
- [ ] **Step 4: Update `docs/progress.md` marking all deliverables complete**
- [ ] **Step 5: Final commit**
  `git commit -m "docs: complete system documentation and final verification report"`
