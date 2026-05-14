import { useState, useRef, useCallback } from 'react';
import { SSE } from 'sse.js';
import type {
  SDKMessage,
  AssistantMessage,
  UserMessage,
  ResultMessage,
  SDKContentBlock,
  DisplayMessage,
  DisplayResult,
  DisplayState,
  ToolResultContent,
} from '../types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function buildDisplayMessages(
  messages: DisplayMessage[],
  sdkMessage: SDKMessage
): DisplayMessage[] {
  const updated = [...messages];

  switch (sdkMessage.type) {
    case 'user': {
      const userMsg = sdkMessage as UserMessage;
      const rawContent = userMsg.message.content;
      const contentArr: unknown[] = typeof rawContent === 'string'
        ? [{ type: 'text', text: rawContent }]
        : (rawContent as unknown[]);
      const blocks: SDKContentBlock[] = contentArr.filter(
        (c): c is SDKContentBlock =>
          (c as SDKContentBlock).type === 'text' ||
          (c as SDKContentBlock).type === 'thinking' ||
          (c as SDKContentBlock).type === 'tool_use'
      );
      const toolResults: ToolResultContent[] = contentArr.filter(
        (c) => (c as Record<string, unknown>).type === 'tool_result'
      ) as unknown as ToolResultContent[];

      updated.push({
        id: userMsg.uuid || generateId(),
        role: 'user',
        content: blocks,
        timestamp: Date.now(),
        toolResults: toolResults.length > 0 ? toolResults : undefined,
      });
      break;
    }
    case 'assistant': {
      const assistantMsg = sdkMessage as AssistantMessage;
      const content = assistantMsg.message.content || [];
      updated.push({
        id: assistantMsg.uuid || generateId(),
        role: 'assistant',
        content: content.filter(
          (c): c is SDKContentBlock =>
            c.type === 'text' || c.type === 'thinking' || c.type === 'tool_use'
        ),
        timestamp: Date.now(),
      });
      break;
    }
    case 'result': {
      break;
    }
  }

  return updated;
}

function buildResult(sdkMessage: SDKMessage): DisplayResult | null {
  if (sdkMessage.type !== 'result') return null;
  const result = sdkMessage as ResultMessage;
  return {
    duration_ms: result.duration_ms,
    duration_api_ms: result.duration_api_ms,
    is_error: result.is_error,
    num_turns: result.num_turns,
    result: result.result,
    total_cost_usd: result.total_cost_usd || 0,
    usage: result.usage,
    errors: result.errors,
  };
}

export function useSSE() {
  const [state, setState] = useState<DisplayState>({
    messages: [],
    result: null,
    isStreaming: false,
    error: null,
  });
  const sseRef = useRef<SSE | null>(null);

  const sendQuery = useCallback((prompt: string) => {
    // Close previous connection if any
    if (sseRef.current) {
      sseRef.current.close();
    }

    setState({
      messages: [],
      result: null,
      isStreaming: true,
      error: null,
    });

    const source = new SSE('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      payload: JSON.stringify({ prompt }),
      start: false, // Don't start automatically, we'll listen first
      autoReconnect: false,
    });

    sseRef.current = source;

    source.addEventListener('message', (event: Event) => {
      const e = event as Event & { data: string };
      const data = e.data?.trim();
      if (!data) return;

      if (data === '[DONE]') {
        setState(prev => ({ ...prev, isStreaming: false }));
        return;
      }

      try {
        const parsed: SDKMessage = JSON.parse(data);

        if (parsed.type === 'error') {
          setState(prev => ({
            ...prev,
            error: (parsed as { type: 'error'; error: string }).error,
            isStreaming: false,
          }));
          return;
        }

        if (parsed.type === 'connection_established') {
          return;
        }

        if (parsed.type === 'user' || parsed.type === 'assistant') {
          setState(prev => ({
            ...prev,
            messages: buildDisplayMessages(prev.messages, parsed),
          }));
        }

        if (parsed.type === 'result') {
          const result = buildResult(parsed);
          if (result) {
            setState(prev => ({
              ...prev,
              result,
              isStreaming: false,
            }));
          }
        }
      } catch (e) {
        console.warn('Failed to parse SSE data:', data, e);
      }
    });

    source.addEventListener('error', () => {
      setState(prev => {
        if (prev.isStreaming) {
          return { ...prev, error: '连接断开', isStreaming: false };
        }
        return prev;
      });
    });

    source.addEventListener('abort', () => {
      setState(prev => ({ ...prev, isStreaming: false }));
    });

    source.stream();
  }, []);

  const cancelQuery = useCallback(() => {
    if (sseRef.current) {
      sseRef.current.close();
      sseRef.current = null;
    }
    setState(prev => ({ ...prev, isStreaming: false }));
  }, []);

  const clearMessages = useCallback(() => {
    if (sseRef.current) {
      sseRef.current.close();
      sseRef.current = null;
    }
    setState({
      messages: [],
      result: null,
      isStreaming: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    sendQuery,
    cancelQuery,
    clearMessages,
  };
}
