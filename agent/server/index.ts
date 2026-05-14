import express from 'express';
import cors from 'cors';
import { query } from '@anthropic-ai/claude-agent-sdk';
import type { HookJSONOutput } from "@anthropic-ai/claude-agent-sdk";
import * as path from "path";
import { aiQuery } from './query';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/query', async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  if (!prompt) {
    res.status(400).json({ error: 'prompt is required' });
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  res.write(`data: ${JSON.stringify({ type: 'connection_established' })}\n\n`);

  try {

    await aiQuery(
      (value) => {
        res.write(`data: ${JSON.stringify(value)}\n\n`);
      }
    )

    res.write(`data: [DONE]\n\n`);
  } catch (error) {
    console.error('[server] Query error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.write(`data: ${JSON.stringify({ type: 'error', error: errorMessage })}\n\n`);
  } finally {
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
