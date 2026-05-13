import type { Context, Next } from 'hono';
import { Logger } from '@/common';

const log = new Logger('req');
export const logger = (ctx: Context, next: Next) => {
  log.info(`${ctx.req.method} ${ctx.req.path}`);
  return next();
};
