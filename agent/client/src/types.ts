// Content block types from Anthropic Messages API
export interface TextContent {
  type: 'text';
  text: string;
}

export interface ThinkingContent {
  type: 'thinking';
  thinking: string;
  signature?: string;
}

export interface ToolUseContent {
  type: 'tool_use';
  id: string;
  name: string;
  input: Record<string, unknown>;
}

export interface ToolResultContent {
  type: 'tool_result';
  tool_use_id: string;
  content: string;
  is_error?: boolean;
}

export type SDKContentBlock = TextContent | ThinkingContent | ToolUseContent;

// Assistant message from SDK
export interface AssistantMessage {
  type: 'assistant';
  message: {
    content: SDKContentBlock[];
    [key: string]: unknown;
  };
  parent_tool_use_id: string | null;
  uuid: string;
  session_id: string;
}

// User message from SDK
export interface UserMessage {
  type: 'user';
  message: {
    content: string | SDKContentBlock[];
    [key: string]: unknown;
  };
  parent_tool_use_id: string | null;
  uuid?: string;
  session_id: string;
}

// Result message from SDK
export interface ResultMessage {
  type: 'result';
  subtype: 'success' | 'error_during_execution' | 'error_max_turns' | 'error_max_budget_usd' | 'error_max_structured_output_retries';
  duration_ms: number;
  duration_api_ms: number;
  is_error: boolean;
  num_turns: number;
  result?: string;
  total_cost_usd: number;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    cacheReadInputTokens: number;
    cacheCreationInputTokens: number;
    webSearchRequests: number;
    costUSD: number;
    contextWindow: number;
  };
  errors?: string[];
  uuid: string;
  session_id: string;
}

// System message from SDK
export interface SystemMessage {
  type: 'system';
  subtype?: string;
  message?: string;
  [key: string]: unknown;
}

// Tool progress message from SDK
export interface ToolProgressMessage {
  type: 'tool_progress';
  tool_use_id: string;
  tool_name: string;
  elapsed_time_seconds: number;
  uuid: string;
  session_id: string;
}

// Stream event from SDK
export interface StreamEventMessage {
  type: 'stream_event';
  event: {
    type: string;
    [key: string]: unknown;
  };
  parent_tool_use_id: string | null;
  uuid: string;
  session_id: string;
}

// Connection established event (server-sent)
export interface ConnectionEvent {
  type: 'connection_established';
}

// Error event
export interface ErrorEvent {
  type: 'error';
  error: string;
}

// Done event
export interface DoneEvent {
  type: '[DONE]';
}

export type SDKMessage =
  | AssistantMessage
  | UserMessage
  | ResultMessage
  | SystemMessage
  | ToolProgressMessage
  | StreamEventMessage
  | ConnectionEvent
  | ErrorEvent
  | DoneEvent;

// UI-specific display types
export interface DisplayMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: SDKContentBlock[];
  timestamp: number;
  toolResults?: ToolResultContent[];
}

export interface DisplayResult {
  duration_ms: number;
  duration_api_ms: number;
  is_error: boolean;
  num_turns: number;
  result?: string;
  total_cost_usd: number;
  usage?: ResultMessage['usage'];
  errors?: string[];
}

export interface DisplayState {
  messages: DisplayMessage[];
  result: DisplayResult | null;
  isStreaming: boolean;
  error: string | null;
}
