import { NextResponse } from "next/server";

interface RateLimitEntry {
  timestamps: number[];
}

interface RateLimiterConfig {
  /** Maximum number of requests allowed within the window */
  limit: number;
  /** Time window in seconds */
  windowSeconds: number;
}

const store = new Map<string, RateLimitEntry>();

/** Interval between cleanup sweeps in milliseconds (60 seconds) */
const CLEANUP_INTERVAL_MS = 60_000;
let lastCleanup = Date.now();

/**
 * Removes expired entries from the in-memory store to prevent unbounded growth.
 * Runs at most once per CLEANUP_INTERVAL_MS.
 */
function cleanupExpiredEntries(windowMs: number): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

/**
 * Extracts the client IP address from the request.
 * Uses x-forwarded-for (set by Vercel/reverse proxies) with fallback to "unknown".
 */
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs; the first is the client
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

/**
 * Creates a rate limiter function for a specific route.
 *
 * Uses a sliding window approach: each request timestamp is stored, and
 * only timestamps within the current window are counted.
 *
 * @returns `null` if the request is allowed, or a 429 NextResponse if rate limited.
 */
export function createRateLimiter(config: RateLimiterConfig) {
  const windowMs = config.windowSeconds * 1000;

  return function checkRateLimit(request: Request): NextResponse | null {
    cleanupExpiredEntries(windowMs);

    const ip = getClientIp(request);
    const key = `${ip}`;
    const now = Date.now();

    const entry = store.get(key) ?? { timestamps: [] };

    // Remove timestamps outside the current window
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

    if (entry.timestamps.length >= config.limit) {
      const oldestInWindow = entry.timestamps[0];
      const retryAfterSeconds = Math.ceil((oldestInWindow + windowMs - now) / 1000);

      return NextResponse.json(
        { error: "För många förfrågningar. Försök igen senare." },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
          },
        }
      );
    }

    entry.timestamps.push(now);
    store.set(key, entry);

    return null;
  };
}
