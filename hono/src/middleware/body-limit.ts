import type { Context, Next } from 'hono';
import { bodyLimit as honoBodyLimit } from 'hono/body-limit';

const limit = honoBodyLimit({
  maxSize: Math.round(Number(process.env.BODY_LIMIT_MB || 10) * 1024 * 1024),
  onError: (c: Context) => {
    return c.json(
      {
        success: false,
        code: 400,
        message: `请求体大小超过限制 (${process.env.BODY_LIMIT_MB || 10}MB)`,
      },
      413,
    );
  },
});

export function bodyLimit(ctx: Context, next: Next) {
  return limit(ctx, next);
}
