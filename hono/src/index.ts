import { Hono } from 'hono';
import { setupRouter } from './controller';
import { logger, notFound, onError } from './middleware';

const app = new Hono();

app.use(logger);
setupRouter(app);
app.onError(onError);
app.notFound(notFound);

export default app;
