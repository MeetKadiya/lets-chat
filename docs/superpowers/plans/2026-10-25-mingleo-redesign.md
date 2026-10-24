# Mingleo Complete Product Rebranding & UI/UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the video chat web application into **Mingleo**, a playful, cartoon-style social discovery platform inspired by Minecraft's blocky charm and Gumroad's bold tactile simplicity, while strictly preserving the existing WebRTC, Socket.IO, and session architecture.

**Architecture:** Frontend (Next.js 14 App Router, Tailwind CSS, Lucide Icons) styled with a blocky, tactile palette (Warm Cream, Mint, Grass Green, Deep Green, Charcoal, Sky Blue), chunky bordered buttons with solid drop-shadows, and modular tabbed discovery views. The backend (Socket.IO + WebRTC signaling + PostgreSQL + Redis) remains fully preserved.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide React, Socket.IO Client, WebRTC RTCPeerConnection, Vitest.

**Spec:** [strangerconnect_project_spec.md](file:///I:/Videos/Video%201/strangerconnect_project_spec.md) and User Request.

---

## Global Constraints

- **Brand:** Name is **Mingleo** (lowercase wordmark `mingleo`), tagline: *"Meet strangers. Make connections."*
- **Palette:**
  - Warm cream: `#FFF9ED`
  - Pale mint: `#EAF5D5`
  - Grass green: `#65A843`
  - Deep green: `#316B25`
  - Charcoal: `#252820`
  - Sky blue: `#8CCDF4`
  - White: `#FFFFFF`
- **Tactile UI Aesthetic:** Chunky borders (`2px solid #252820`), solid 3D bottom drop-shadows (`box-shadow: 0 4px 0 #252820`), rounded-2xl cards, blocky landscape accents.
- **Backend Preservation:** Do NOT alter backend API contracts, database schemas, or WebRTC signaling protocols.
- **Testing:** All existing unit and component tests must pass at every step.

---

## Review Focus

1. **WebRTC Track Binding:** Live video elements must properly bind local and remote MediaStreams without breaking mute/camera toggle.
2. **Contrast & Readability:** Text on cream/mint backgrounds must strictly maintain high charcoal contrast (WCAG AAA).
3. **Responsive Breakpoints:** Dual video panels must adapt smoothly from stacked on mobile to side-by-side on desktop without horizontal overflow.
4. **Interactive State Feedback:** Chunky buttons must provide distinct hover and active pressed states (`translate-y-1 shadow-none`).
5. **Modal & Drawer Isolation:** All views (Profile, Interests, Pricing, Friends, Safety, Settings) must cleanly toggle without UI collision.

---

### Task 1: Establish Mingleo Design System & Tokens
**Files:**
- Modify: `apps/web/tailwind.config.js`
- Modify: `apps/web/app/globals.css`
- Modify: `apps/web/app/layout.tsx`

- [ ] Add Mingleo color palette tokens (`mingleo-cream`, `mingleo-mint`, `mingleo-green`, `mingleo-deepGreen`, `mingleo-charcoal`, `mingleo-sky`, `mingleo-white`) to `tailwind.config.js`.
- [ ] Add chunky button utility classes (`.mingleo-btn-green`, `.mingleo-btn-white`, `.mingleo-btn-red`, `.mingleo-card`) and blocky landscape CSS ground pattern to `globals.css`.
- [ ] Update `layout.tsx` title, metadata, and default body classes to Mingleo branding.
- [ ] Verify Tailwind compiles without warnings.

### Task 2: Build Core Reusable Mingleo Components
**Files:**
- Create: `apps/web/components/common/MingleoLogo.tsx`
- Create: `apps/web/components/common/BlockyTerrain.tsx`
- Create: `apps/web/components/navigation/MingleoHeader.tsx`
- Create: `apps/web/components/common/ChunkyButton.tsx`

- [ ] Create `MingleoLogo.tsx` with lowercase wordmark `mingleo` and green pixel chat-bubble mascot.
- [ ] Create `BlockyTerrain.tsx` featuring cute blocky grass & dirt ground, pixel flowers, blocky tree, and walking sheep.
- [ ] Create `MingleoHeader.tsx` with navigation links (Chat, About, Safety, Pricing) and User pill.
- [ ] Verify components render cleanly in isolation.

### Task 3: Redesign Landing & Home Page (`/`)
**Files:**
- Modify: `apps/web/app/page.tsx`
- Modify: `apps/web/components/landing/HeroSection.tsx`
- Modify: `apps/web/components/landing/MatchCard.tsx`
- Modify: `apps/web/components/landing/WebcamPreview.tsx`

- [ ] Refactor `page.tsx` to render the blocky cream/mint landing layout with `MingleoHeader`, central interactive dual panels, and `BlockyTerrain`.
- [ ] Update `HeroSection.tsx` with heading *"Meet someone new."*, benefit cards (Meet new people, Be kind & respectful, Your safety matters).
- [ ] Style `MatchCard.tsx` and `WebcamPreview.tsx` with chunky blocky cards, sky-blue video backdrop, and green *"▶ Start chatting"* CTA button.
- [ ] Verify test suite `landing.test.tsx` passes.

### Task 4: Redesign Live Video & Text Chat Room (`/chat`)
**Files:**
- Modify: `apps/web/app/chat/page.tsx`
- Modify: `apps/web/components/chat/ChatContainer.tsx`
- Modify: `apps/web/components/chat/ChatControls.tsx`
- Modify: `apps/web/components/chat/MessageList.tsx`
- Modify: `apps/web/components/chat/MessageInput.tsx`

- [ ] Style chat room header with `mingleo` logo, Report button, and Esc shortcut badge.
- [ ] Implement dual-panel video stage with "📶 You" and "🟢 Stranger" badges.
- [ ] Implement chunky circular control buttons: `[ ⏩ Next ]`, `[ 🎤 Mute ]`, `[ 📞 End ]`.
- [ ] Redesign chat messages with mint/cream bubbles and charcoal borders.
- [ ] Add friendly footer reminder: *"🤍 Be kind. Be respectful. Have fun!"*.

### Task 5: Build Comprehensive Social & Discovery Modals / Views
**Files:**
- Create: `apps/web/components/mingleo/ProfileView.tsx`
- Create: `apps/web/components/mingleo/SubscriptionView.tsx`
- Create: `apps/web/components/mingleo/InterestsView.tsx`
- Create: `apps/web/components/mingleo/FriendsChatsView.tsx`
- Create: `apps/web/components/mingleo/SafetyView.tsx`
- Create: `apps/web/components/mingleo/SettingsView.tsx`

- [ ] Implement Profile view (display name, bio with char counter, blocky avatar selector, Save Changes).
- [ ] Implement Subscription & Pricing view (Free vs Plus comparison, monthly/yearly toggle, features matrix).
- [ ] Implement Interests & Matching preferences view with blocky chips (Gaming, Minecraft, Music, Movies, Anime, Art, Sports, Tech, Reading, Travel, Food, Animals) and age range slider.
- [ ] Implement Friends & Recent Chats view with friend requests, online/offline status, and chat history.
- [ ] Implement Safety & Moderation center (Report a User, Blocked Users list, Privacy toggles).
- [ ] Implement Settings & Notifications view (Account credentials, language, notification toggles).

### Task 6: Final Verification & Docker Build
**Files:**
- Modify: `apps/web/tests/landing.test.tsx`
- Verify: `npm test` across all workspaces
- Verify: `npm run build --workspace=apps/web`

- [ ] Run full test suite (`packages/shared`, `apps/realtime`, `apps/web`).
- [ ] Run Next.js production build.
- [ ] Verify responsive layout across mobile and desktop.
- [ ] Commit all changes to master.
