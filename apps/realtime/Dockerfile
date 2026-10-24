FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/realtime/package.json ./apps/realtime/
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY packages/shared ./packages/shared
COPY apps/realtime ./apps/realtime
COPY package.json tsconfig.json ./
RUN npm run build --workspace=packages/shared
RUN npm run build --workspace=apps/realtime

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

COPY --from=builder --chown=appuser:nodejs /app/apps/realtime/dist ./apps/realtime/dist
COPY --from=builder --chown=appuser:nodejs /app/apps/realtime/src/scripts ./apps/realtime/src/scripts
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/realtime/package.json ./apps/realtime/package.json

USER appuser
EXPOSE 4000
ENV PORT=4000
CMD ["npm", "run", "start", "--workspace=apps/realtime"]
