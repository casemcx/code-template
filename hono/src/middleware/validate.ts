import { zValidator } from '@hono/zod-validator';
import type { ValidationTargets } from 'hono';
import type { ZodError, ZodType } from 'zod';
import { ValidateError } from '@/models/errors';

export function validate(target: keyof ValidationTargets, schema: ZodType) {
  return zValidator(target, schema, (result, _c) => {
    if (!result.success) {
      const error = result.error as ZodError;
      throw new ValidateError(
        error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      );
    }
  });
}
