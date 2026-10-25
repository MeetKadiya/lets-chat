# Let's Chat 💬🌿

> **Playful, tactile anonymous random video-chat platform with interest matching and 2v2 squad rooms.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7-010101?style=flat&logo=socketdotio)](https://socket.io/)
[![WebRTC](https://img.shields.io/badge/WebRTC-P2P%20Encrypted-333333?style=flat&logo=webrtc)](https://webrtc.org/)
[![Redis](https://img.shields.io/badge/Redis-7.2-DC382D?style=flat&logo=redis)](https://redis.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)](https://www.docker.com/)

---

## 🎨 Visual Identity & Experience

Let's Chat blends the bold simplicity of **Gumroad** with the tactile, blocky charm of **Minecraft**:
* **Chunky Tactile Panels:** Cream cards (`#FFF9E9`), mint-fresh backgrounds (`#E8F2DF`), and bold 2px ink borders (`#111111`) with offset drop shadows (`shadow-[0_4px_0_#111111]`).
* **Pixel-Art Scenery & Characters:** Pixel player avatars, floating clouds, grass blocks, friendly sheep, flowers, and full pixel trees.
* **Responsive Layout:** Designed for desktop, tablet, and mobile with keyboard shortcuts (<kbd>Esc</kbd> for Next).

---

## ✨ Key Features

### 1. 🚀 1-on-1 Anonymous Video Chat
* **Zero Barrier:** No mandatory sign-up, email, or passwords. Ephemeral 256-bit secure sessions generated instantly.
* **P2P WebRTC Streams:** Direct encrypted audio and video feeds decoupled from signaling servers for ultra-low latency.
* **Live In-Call Messaging:** Integrated chatbox with real-time text delivery and typing states.
* **Quick Controls:** 1-click **Next (<kbd>Esc</kbd>)**, **Mute Mic**, **Disable Camera**, **End Call**, and **Report / Block**.

### 2. 👥 Squad Rooms (2v2 Duo Party Mode)
* **Team Up with Friends:** Generate a shareable 6-digit party code (e.g. `887 123`) with 1-click copy.
* **Join via Code:** Friends can enter the room code to link into your duo squad.
* **2v2 Stranger Matching:** Both camera feeds enter matchmaking together to meet stranger pairs.
* **Synchronized Skipping:** Either squad partner can skip to the next room together.

### 3. 🎯 Smart Interest Matching
* **Tag Preferences:** Choose from 12+ interest categories (Gaming, Minecraft, Anime, Music, Tech, Art, and more).
* **Jaccard Similarity Scoring:** Matches you with users sharing overlapping interests with progressive queue relaxation (0–10s strict, 10–20s loose, 20s+ random fallback).

### 4. 🛡️ Safety & Moderation
* **Atomic Matchmaking:** Redis Lua scripts (`reserve_match.lua`) prevent duplicate matches, race conditions, or ghost allocations.
* **Sliding-Window Rate Limiting:** Prevents skip spam and DDoS abuses.
* **One-Click Moderation:** Instant abuse reporting and persistent bidirectional user blocking.

---

## 🧭 Page Routes & Screens

| Route | Screen Name | Description |
| :--- | :--- | :--- |
| **`/`** | **Home Lobby** | Dual video arena, Solo/Squad switcher, interest selector, and live call action. |
| **`/chat`** | **Live Video Room** | Full-screen live 1-on-1 WebRTC video session with chat and controls. |
| **`/squad`** | **Squad Rooms** | Dedicated 2v2 duo party lobby with code generation and partner join. |
| **`/profile`** | **My Profile** | Custom avatar selector, username, bio, and stats showcase. |
| **`/pricing`** | **Let's Chat Plus** | Subscription plans ($0 Free vs $9.99/mo Plus with gender filter & perks). |
| **`/interests`**| **Interests & Tags** | Visual grid of 12+ interest badges with multi-select support. |
| **`/friends`** | **Friends & History** | Active friends list, recent conversation log, and add-friend shortcuts. |
| **`/safety`** | **Safety Center** | Community guidelines, safety pledges, and reporting procedures. |
| **`/settings`**| **Settings** | Device selectors (camera/mic), notifications, theme, and audio toggles. |

---

## 🛠️ Architecture & Monorepo Structure

```
LetsChat/
├── apps/
│   ├── web/                     # Next.js 14 App Router Frontend
│   │   ├── app/                 # Routes: /, /chat, /squad, /profile, /pricing, etc.
│   │   ├── components/
│   │   │   ├── letschat/        # Minecraft/Gumroad blocky UI components & screens
│   │   │   ├── chat/            # Realtime chat container & messaging
│   │   │   └── video/           # WebRTC video elements & stream handles
│   │   └── public/assets/       # Pixel-art SVG characters, environment & icons
│   └── realtime/                # Node.js + Socket.IO + Express Backend
│       ├── src/
│       │   ├── services/        # Matchmaking, Session, WebRTC signaling, Moderation
│       │   ├── repositories/    # Redis Lua script runners & PostgreSQL pools
│       │   └── socket/          # Socket.IO connection and event dispatchers
│       └── scripts/lua/         # reserve_match.lua (Atomic matching transaction)
├── packages/
│   └── shared/                  # Shared Zod schemas, TypeScript types, and socket events
└── docker-compose.prod.yml      # Production orchestration (Web, Realtime, Redis, Postgres)
```

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js**: v20 or higher
* **npm**: v10 or higher
* **Docker & Docker Compose** (for production or containerized services)

---

### Method A: Local Development

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Build Shared Contracts
```bash
npm run build --workspace=packages/shared
```

#### 3. Run Automated Tests
```bash
npm test
```

#### 4. Start Development Servers
Open two terminal tabs:

```bash
# Terminal 1: Realtime Signaling Server (Port 4000)
npm run dev:realtime

# Terminal 2: Next.js Web App (Port 3000)
npm run dev:web
```

Visit [http://localhost:3000](http://localhost:3000) in your browser!

---

### Method B: Production Docker Deployment

To launch the full production environment (PostgreSQL 16, Redis 7, Realtime Server, and Next.js Web App):

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

To stop containers:
```bash
docker compose -f docker-compose.prod.yml down
```

---

## 🧪 Testing

The codebase includes comprehensive Vitest test suites:

```bash
# Run all workspace tests
npm test

# Run only web component tests
npm run test --workspace=apps/web

# Run only shared contracts tests
npm run test --workspace=packages/shared
```

Coverage highlights:
* **Shared Zod Contracts:** Validates payloads, string bounds, and enum categories.
* **Atomic Matchmaking:** Verified queue reservations, mutual interest matching, and timeout fallbacks.
* **Signaling Integrity:** SDP offer/answer relay, ICE candidates, and spoof prevention.
* **Frontend UI Components:** Navigation, Start Card, Mode Switchers, Terrain Footer, and Call Controls.

---

## 📜 License
This project is licensed under the MIT License.
