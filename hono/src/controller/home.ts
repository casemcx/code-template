import type { Context } from 'hono';
import { z } from 'zod';
import { Controller } from '@/common';
import { validate } from '@/middleware/validate';

export class HomeController extends Controller {
  constructor() {
    super('/home');
  }

  init() {
    this.app.get(
      '/:id',
      validate(
        'param',
        z.object({
          id: z
            .string()
            .regex(/^\d{5}$/, 'id不合法')
            .optional()
            .default('12345'),
        }),
      ),
      this.get(),
    );
    return this.app;
  }

  get() {
    return (ctx: Context) => {
      const id = ctx.req.param<string>('id');
      return this.success(ctx, { data: { id } });
    };
  }
}
