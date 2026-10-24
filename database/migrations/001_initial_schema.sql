-- Let's Chat Database Schema Migration 001
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS anonymous_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_hash TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked'))
);

CREATE INDEX IF NOT EXISTS idx_anonymous_sessions_token_hash ON anonymous_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_anonymous_sessions_expires_at ON anonymous_sessions(expires_at);

CREATE TABLE IF NOT EXISTS interests (
    id BIGSERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS session_interests (
    session_id UUID NOT NULL REFERENCES anonymous_sessions(id) ON DELETE CASCADE,
    interest_id BIGINT NOT NULL REFERENCES interests(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (session_id, interest_id)
);

CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_a UUID NOT NULL REFERENCES anonymous_sessions(id) ON DELETE CASCADE,
    session_b UUID NOT NULL REFERENCES anonymous_sessions(id) ON DELETE CASCADE,
    mode TEXT NOT NULL CHECK (mode IN ('text', 'video', 'both')),
    status TEXT NOT NULL DEFAULT 'connecting' CHECK (status IN ('connecting', 'active', 'ended')),
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    end_reason TEXT CHECK (end_reason IN ('skip', 'disconnect', 'ban', 'error') OR end_reason IS NULL),
    CONSTRAINT chk_different_participants CHECK (session_a <> session_b)
);

CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);
CREATE INDEX IF NOT EXISTS idx_matches_started_at ON matches(started_at);
CREATE INDEX IF NOT EXISTS idx_matches_session_a ON matches(session_a);
CREATE INDEX IF NOT EXISTS idx_matches_session_b ON matches(session_b);

CREATE TABLE IF NOT EXISTS blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blocker_session_id UUID NOT NULL REFERENCES anonymous_sessions(id) ON DELETE CASCADE,
    blocked_session_id UUID NOT NULL REFERENCES anonymous_sessions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_block_pair UNIQUE (blocker_session_id, blocked_session_id),
    CONSTRAINT chk_no_self_block CHECK (blocker_session_id <> blocked_session_id)
);

CREATE INDEX IF NOT EXISTS idx_blocks_blocker ON blocks(blocker_session_id);
CREATE INDEX IF NOT EXISTS idx_blocks_blocked ON blocks(blocked_session_id);

CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_session_id UUID NOT NULL REFERENCES anonymous_sessions(id) ON DELETE CASCADE,
    reported_session_id UUID NOT NULL REFERENCES anonymous_sessions(id) ON DELETE CASCADE,
    match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('spam', 'harassment', 'nudity', 'other')),
    details TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'actioned', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_match_id ON reports(match_id);

CREATE TABLE IF NOT EXISTS moderation_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES reports(id) ON DELETE SET NULL,
    target_session_id UUID NOT NULL REFERENCES anonymous_sessions(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL CHECK (action_type IN ('warning', 'temporary ban', 'permanent ban')),
    reason TEXT NOT NULL,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_moderation_target ON moderation_actions(target_session_id);
CREATE INDEX IF NOT EXISTS idx_moderation_expires_at ON moderation_actions(expires_at);
