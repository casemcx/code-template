import type { Context, Next } from 'hono';

export function securityHeaders(ctx: Context, next: Next) {
  ctx.res.headers.set('X-Content-Type-Options', 'nosniff');
  ctx.res.headers.set('X-Frame-Options', 'DENY');
  ctx.res.headers.set('X-XSS-Protection', '0');
  ctx.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  ctx.res.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains',
  );
  ctx.res.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );
  return next();
}
