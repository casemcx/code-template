import type { Context, Next } from 'hono';
import { cors as honoCors } from 'hono/cors';

const corsMiddleware = honoCors({
  origin: process.env.CORS_ORIGIN || '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
  exposeHeaders: ['X-Request-Id'],
  maxAge: 86400,
  credentials: true,
});

export function cors(ctx: Context, next: Next) {
  return corsMiddleware(ctx, next);
}
