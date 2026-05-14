import type { Context, Next } from 'hono';
import { jwt as honoJwt } from 'hono/jwt';

const secret = process.env.JWT_SECRET || '';

function getJwtMiddleware() {
  if (!secret) {
    return (_ctx: Context, next: Next) => next();
  }
  return honoJwt({ secret });
}

const jwtMiddleware = getJwtMiddleware();

export function jwt(ctx: Context, next: Next) {
  return jwtMiddleware(ctx, next);
}
