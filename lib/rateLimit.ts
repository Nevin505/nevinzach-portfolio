interface RateLimitRecord {
  count: number;
  resetTime: number;
}

interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 10 minutes)
  max?: number; // Max requests allowed per window (default: 3)
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp in seconds
  retryAfterSeconds: number;
}

class MemoryRateLimiter {
  private cache: Map<string, RateLimitRecord> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Run cleanup every 5 minutes to prevent memory leaks
    if (typeof setInterval !== "undefined") {
      this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
      // Unref timer in Node environment so it doesn't prevent process shutdown
      if (this.cleanupInterval.unref) {
        this.cleanupInterval.unref();
      }
    }
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, record] of this.cache.entries()) {
      if (now > record.resetTime) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Check and increment the request count for a given identifier
   */
  public check(identifier: string, options?: RateLimitOptions): RateLimitResult {
    const windowMs = options?.windowMs ?? 10 * 60 * 1000; // 10 minutes default
    const max = options?.max ?? 3; // 3 transmissions per window default
    const now = Date.now();

    const record = this.cache.get(identifier);

    if (!record || now > record.resetTime) {
      // Window expired or new identifier
      const resetTime = now + windowMs;
      this.cache.set(identifier, {
        count: 1,
        resetTime,
      });

      return {
        success: true,
        limit: max,
        remaining: max - 1,
        reset: Math.ceil(resetTime / 1000),
        retryAfterSeconds: 0,
      };
    }

    if (record.count < max) {
      record.count += 1;
      return {
        success: true,
        limit: max,
        remaining: max - record.count,
        reset: Math.ceil(record.resetTime / 1000),
        retryAfterSeconds: 0,
      };
    }

    // Rate limit exceeded
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((record.resetTime - now) / 1000)
    );

    return {
      success: false,
      limit: max,
      remaining: 0,
      reset: Math.ceil(record.resetTime / 1000),
      retryAfterSeconds,
    };
  }
}

// Global singleton instance
const globalRateLimiter = new MemoryRateLimiter();

/**
 * Extracts client IP from standard proxy headers
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp =
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    headers.get("x-client-ip") ||
    headers.get("true-client-ip");

  if (realIp) {
    return realIp.trim();
  }

  return "anonymous_node";
}

/**
 * Checks rate limit for a request based on IP or custom key
 */
export function checkRateLimit(
  req: Request,
  additionalKey?: string,
  options?: RateLimitOptions
): RateLimitResult {
  const clientIp = getClientIp(req);
  const key = additionalKey ? `${clientIp}:${additionalKey.toLowerCase()}` : clientIp;
  return globalRateLimiter.check(key, options);
}

/**
 * Creates standard HTTP rate limit headers
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.reset.toString(),
  };

  if (!result.success) {
    headers["Retry-After"] = result.retryAfterSeconds.toString();
  }

  return headers;
}
