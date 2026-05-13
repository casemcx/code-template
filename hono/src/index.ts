import { Hono } from 'hono';
import { setupRouter } from './controller';
import { logger } from './middleware/logger';

const app = new Hono();

setupRouter(app);
app.use(logger);

export default app;
