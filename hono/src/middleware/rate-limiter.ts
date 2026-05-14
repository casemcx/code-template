import type { Context, Next } from 'hono';
import { rateLimiter as honoRateLimiter } from 'hono-rate-limiter';
import { HttpError } from '@/models/errors';
import { ResultCode } from '@/models/result';

const limiter = honoRateLimiter({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: 'draft-6',
  keyGenerator: (c: Context) => {
    const forwarded = c.req.header('x-forwarded-for');
    return (
      forwarded?.split(',')[0]?.trim() || c.req.header('x-real-ip') || 'unknown'
    );
  },
  handler: (_c: Context) => {
    throw new HttpError(ResultCode.FORBIDDEN, '请求过于频繁，请稍后再试');
  },
});

export function rateLimiter(ctx: Context, next: Next) {
  return limiter(ctx, next);
}
