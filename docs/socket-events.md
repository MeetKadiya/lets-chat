# Let's Chat — Socket.IO Event Specification

**Protocol Version:** 1.0.0  
**Transport:** WebSocket (with polling fallback)  
**Acknowledgment Pattern:** All client requests support callbacks: `{ ok: boolean, data?: any, error?: { code: string, message: string } }`.

---

## 1. Client-to-Server Events

| Event | Payload Schema | Description |
| :--- | :--- | :--- |
| `session:init` | `{ protocolVersion?: string, token?: string }` | Initialize or resume an anonymous session. Returns `sessionId`, `token`, `expiresAt`. |
| `queue:join` | `{ mode: 'text' \| 'video' \| 'both', interests: string[] }` | Join the matchmaking queue with specified mode and optional interest tags. |
| `queue:cancel` | `{ requestId?: string }` | Remove user from all matchmaking queues. |
| `chat:send` | `{ matchId: string, messageId: string, text: string }` | Send a real-time text message to stranger. Maximum 2000 chars. |
| `match:next` | `{ matchId?: string, requestId?: string }` | Leave current match, notify peer with `reason: 'skip'`, and immediately re-enqueue. |
| `match:leave` | `{ matchId: string }` | Leave current match and return to idle state. |
| `webrtc:offer` | `{ matchId: string, description: { type: 'offer', sdp: string } }` | Relay WebRTC SDP offer to matched peer. |
| `webrtc:answer` | `{ matchId: string, description: { type: 'answer', sdp: string } }` | Relay WebRTC SDP answer to matched peer. |
| `webrtc:ice` | `{ matchId: string, candidate: { candidate: string, sdpMid?: string, sdpMLineIndex?: number } }` | Relay ICE candidate to matched peer. |
| `moderation:report` | `{ matchId: string, category: 'spam' \| 'harassment' \| 'nudity' \| 'other', details?: string }` | Submit formal moderation report. |
| `moderation:block` | `{ matchId: string }` | Block stranger, immediately end match, and prevent future pairings. |

---

## 2. Server-to-Client Events

| Event | Payload Schema | Purpose |
| :--- | :--- | :--- |
| `session:ready` | `{ sessionId: string, expiresAt: string }` | Emitted when session credentials are validated. |
| `queue:status` | `{ status: 'waiting' \| 'cancelled' \| 'timeout' }` | Queue status update. |
| `match:found` | `{ matchId: string, mode: ChatMode, interests: string[], isOfferer: boolean }` | Stranger matched! Includes deterministic offerer assignment for WebRTC. |
| `chat:message` | `{ matchId: string, messageId: string, text: string, sentAt: string }` | Incoming text message from stranger. |
| `match:ended` | `{ matchId: string, reason: 'skip' \| 'disconnect' \| 'ban' \| 'error' }` | Notifies that the conversation has ended. |
| `webrtc:offer` | `{ matchId: string, description: SdpPayload }` | Incoming WebRTC offer from peer. |
| `webrtc:answer` | `{ matchId: string, description: SdpPayload }` | Incoming WebRTC answer from peer. |
| `webrtc:ice` | `{ matchId: string, candidate: IceCandidatePayload }` | Incoming ICE candidate from peer. |
| `peer:status` | `{ state: 'connected' \| 'reconnecting' \| 'disconnected' }` | Peer connection health indicator. |
| `moderation:result` | `{ action: string, status: string }` | Confirmation of report/block submission. |
| `server:error` | `{ code: string, message: string, retryable?: boolean }` | Server error notification. |
