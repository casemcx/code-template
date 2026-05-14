import type { Context, ErrorHandler, NotFoundHandler } from 'hono';
import { Logger } from '@/common/utils';
import { HttpError } from '@/models/errors';
import { Result, ResultCode } from '@/models/result';

const log = new Logger('error');

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return '未知错误';
}

export const onError: ErrorHandler = (error: Error, ctx: Context) => {
  const id = ctx.get('requestId') as string | undefined;
  log.error(
    `[${id || '-'}] ${ctx.req.method} ${ctx.req.path} -> 500 ${getErrorMessage(error)}`,
    error,
  );
  if (error instanceof HttpError) {
    log.warn(
      `[${id || '-'}] ${ctx.req.method} ${ctx.req.path} -> ${error.code} ${error.message}`,
    );
    ctx.res.headers.set('X-Request-Id', id || '');
    return ctx.json(
      Result.error({
        code: error.code,
        message: error.message,
        error: error.error,
      }),
    );
  }

  ctx.res.headers.set('X-Request-Id', id || '');
  return ctx.json(
    Result.error({
      code: ResultCode.INTERNAL_SERVER_ERROR,
      message: '服务器内部错误',
    }),
    500,
  );
};

export const notFound: NotFoundHandler = (ctx: Context) => {
  const id = ctx.get('requestId') as string | undefined;
  log.warn(
    `[${id || '-'}] ${ctx.req.method} ${ctx.req.path} -> 404 路由未找到`,
  );
  ctx.res.headers.set('X-Request-Id', id || '');
  return ctx.json(
    Result.error({
      code: ResultCode.NOT_FOUND,
      message: `路由未找到: ${ctx.req.method} ${ctx.req.path}`,
    }),
    404,
  );
};
