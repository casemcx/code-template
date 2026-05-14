import type { Context, Next } from 'hono';
import { Logger } from '@/common';

const log = new Logger('req');
export const logger = (ctx: Context, next: Next) => {
  const id = ctx.get('requestId') as string | undefined;
  log.info(`[${id || '-'}] ${ctx.req.method} ${ctx.req.path}`);
  return next();
};
