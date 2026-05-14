import type { Context, Next } from 'hono';
import { timeout as honoTimeout } from 'hono/timeout';

const timeoutDuration = Number(process.env.REQUEST_TIMEOUT_MS) || 30_000;

const timeoutMiddleware = honoTimeout(timeoutDuration);

export function timeout(ctx: Context, next: Next) {
  return timeoutMiddleware(ctx, next);
}
