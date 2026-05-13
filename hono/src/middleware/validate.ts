import { zValidator } from '@hono/zod-validator';
import type { ValidationTargets } from 'hono';
import type { ZodError, ZodType } from 'zod';
import { Result, ResultCode } from '@/models/result';

export function validate(target: keyof ValidationTargets, schema: ZodType) {
  return zValidator(target, schema, (result, c) => {
    if (!result.success) {
      return c.json(
        Result.error<ZodError>({
          code: ResultCode.VALIDATION_ERROR,
          message: '请求参数校验失败',
          error: result.error.issues.map((i) => ({
            path: i.path.join('.'),
            message: i.message,
          })),
        }),
        400,
      );
    }
  });
}
