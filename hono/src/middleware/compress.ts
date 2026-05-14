import type { Context, Next } from 'hono';
import { compress as honoCompress } from 'hono/compress';

const compressMiddleware = honoCompress();

export function compress(ctx: Context, next: Next) {
  return compressMiddleware(ctx, next);
}
