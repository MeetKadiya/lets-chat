-- reserve_match.lua
-- Atomic reservation of two participants into a match
-- KEYS: [queueKey]
-- ARGV: [sessionA, sessionB, matchId, matchJson, ttlSeconds]

local queueKey = KEYS[1]
local sessionA = ARGV[1]
local sessionB = ARGV[2]
local matchId = ARGV[3]
local matchJson = ARGV[4]
local ttlSeconds = tonumber(ARGV[5])

-- 1. Prevent self-matching
if sessionA == sessionB then
    return 0
end

-- 2. Check if either user is already assigned to an active match
local activeMatchA = redis.call('GET', 'session:' .. sessionA .. ':match')
local activeMatchB = redis.call('GET', 'session:' .. sessionB .. ':match')

if activeMatchA or activeMatchB then
    return 0
end

-- 3. Remove both participants from the queue
redis.call('ZREM', queueKey, sessionA)
redis.call('ZREM', queueKey, sessionB)

-- Also clean from any alternate queues
redis.call('ZREM', 'queue:text', sessionA, sessionB)
redis.call('ZREM', 'queue:video', sessionA, sessionB)
redis.call('ZREM', 'queue:both', sessionA, sessionB)

-- 4. Store match state
redis.call('SETEX', 'match:' .. matchId, ttlSeconds, matchJson)

-- 5. Map session to matchId
redis.call('SETEX', 'session:' .. sessionA .. ':match', ttlSeconds, matchId)
redis.call('SETEX', 'session:' .. sessionB .. ':match', ttlSeconds, matchId)

-- 6. Add to recent matches exclusion for 10 minutes to prevent immediate rematch
redis.call('SETEX', 'recent:' .. sessionA .. ':' .. sessionB, 600, '1')
redis.call('SETEX', 'recent:' .. sessionB .. ':' .. sessionA, 600, '1')

return 1
