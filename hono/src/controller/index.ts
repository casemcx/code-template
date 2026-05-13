import type { Hono } from 'hono';
import { HomeController } from './home';

export const setupRouter = (app: Hono) => {
  new HomeController().router('/home', app);
};
