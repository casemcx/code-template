import { type Context, Hono } from 'hono';
import {
  Result,
  type ResultErrorOptions,
  type ResultSuccessOptions,
} from '@/models';
import { Component } from './component';

export abstract class Controller extends Component {
  protected app: Hono;
  path?: string;

  constructor(path?: string) {
    super();
    this.path = path;
    this.app = new Hono();
  }

  abstract init(): Hono;

  protected success<T = unknown>(
    ctx: Context,
    result: ResultSuccessOptions<T>,
  ) {
    return ctx.json(Result.success<T>(result));
  }

  protected error<T = unknown>(ctx: Context, result: ResultErrorOptions<T>) {
    return ctx.json(Result.error<T>(result));
  }

  router(path: string, app: Hono) {
    return app.route(path, this.init());
  }
}
