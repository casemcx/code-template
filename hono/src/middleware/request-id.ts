import type { Context, Next } from 'hono';

function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${random}`;
}

export function requestId(ctx: Context, next: Next) {
  const id = ctx.req.header('x-request-id') || generateId();
  ctx.set('requestId', id);
  ctx.res.headers.set('X-Request-Id', id);
  return next();
}
