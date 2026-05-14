import { useEffect, useRef } from 'react';
import { useSSE } from '../hooks/useSSE';
import MessageBubble from './MessageBubble';
import ResultPanel from './ResultPanel';
import InputBox from './InputBox';

export default function ChatView() {
  const {
    messages,
    result,
    isStreaming,
    error,
    sendQuery,
    cancelQuery,
    clearMessages,
  } = useSSE();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, result]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Claude Code SDK Chat
          </h1>
          {isStreaming && (
            <span className="flex items-center gap-1.5 text-sm text-blue-500">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              流式响应中...
            </span>
          )}
        </div>
      </header>

      {/* Messages Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-6"
      >
        <div className="max-w-4xl mx-auto">
          {/* Empty state */}
          {messages.length === 0 && !result && !error && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-lg font-medium mb-2">开始对话</p>
              <p className="text-sm text-gray-400">
                输入你的问题，Claude Code SDK 将实时流式响应
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Result Panel */}
          {result && <ResultPanel result={result} />}

          {/* Error */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">错误</p>
              <p className="text-xs text-red-500 dark:text-red-300 mt-1 font-mono">{error}</p>
            </div>
          )}

          {/* Streaming indicator */}
          {isStreaming && messages.length > 0 && (
            <div className="flex justify-start mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <InputBox
        onSend={sendQuery}
        onCancel={cancelQuery}
        onClear={clearMessages}
        isStreaming={isStreaming}
      />
    </div>
  );
}
