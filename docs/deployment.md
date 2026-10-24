# Let's Chat — Deployment & Production Guide

This guide describes how to run Let's Chat in development and deploy to production infrastructure.

---

## 1. Local Development Setup

### Prerequisites
- Node.js >= 20.x
- Docker & Docker Compose (optional for local db containers)

### Quick Start
```bash
# 1. Install dependencies across all workspaces
npm install

# 2. Build shared packages
npm run build --workspace=packages/shared

# 3. Start local Docker services (PostgreSQL, Redis, Coturn)
docker compose up -d postgres redis

# 4. Run real-time backend (runs on http://localhost:4000)
npm run dev:realtime

# 5. In a separate terminal, run web frontend (runs on http://localhost:3000)
npm run dev:web
```

---

## 2. Docker Compose Production Deployment

The project includes `docker-compose.prod.yml` configured for multi-container production deployments:

```bash
# 1. Configure environment variables in .env
cp .env.example .env
# Set secure passwords and production secrets in .env

# 2. Build and launch all services
docker compose -f docker-compose.prod.yml up -d --build
```

### Services Started:
1. `web`: Next.js 14 production standalone server (`port 3000`).
2. `realtime`: Persistent Node.js + Socket.IO server (`port 4000`).
3. `postgres`: PostgreSQL 16 with persistent volume and initial migrations.
4. `redis`: Redis 7 with AOF persistence.

---

## 3. Reverse Proxy & SSL Configuration (Nginx)

For public deployment, terminate SSL and proxy traffic through Nginx:

```nginx
# Web Application
server {
    server_name strangerconnect.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Socket.IO Realtime WebSocket proxy
    location /socket.io/ {
        proxy_pass http://127.0.0.1:4000/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
```

---

## 4. STUN & TURN Configuration

WebRTC P2P connections require STUN/TURN servers to traverse symmetric NATs and mobile carriers.
StrangerConnect includes Coturn configuration in `infra/turn/turnserver.conf`.
In production:
1. Point `TURN_URL` to your domain or a managed service (e.g. Twilio Network Traversal, Xirsys, Metered).
2. Set `TURN_USERNAME` and `TURN_CREDENTIAL`.
