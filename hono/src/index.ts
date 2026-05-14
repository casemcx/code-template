import { Hono } from 'hono';
import { setupRouter } from './controller';
import {
  bodyLimit,
  compress,
  cors,
  logger,
  notFound,
  onError,
  rateLimiter,
  requestId,
  securityHeaders,
  timeout,
} from './middleware';

const app = new Hono();

app.use(requestId);
app.use(timeout);
app.use(cors);
app.use(securityHeaders);
app.use(compress);
app.use(bodyLimit);
app.use(rateLimiter);
app.use(logger);

setupRouter(app);

app.onError(onError);
app.notFound(notFound);

export default app;
