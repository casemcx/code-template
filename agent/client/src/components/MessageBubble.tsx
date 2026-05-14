import type { DisplayMessage } from '../types';
import TextBlock from './TextBlock';
import ThinkingBlock from './ThinkingBlock';
import ToolUseBlock from './ToolUseBlock';
import ToolResultBlock from './ToolResultBlock';

interface MessageBubbleProps {
  message: DisplayMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-1'}`}>
        {/* Role label */}
        <div className={`text-xs mb-1 font-medium ${
          isUser ? 'text-right text-blue-500' : 'text-left text-gray-500'
        }`}>
          {isUser ? '你' : 'Claude'}
        </div>

        {/* Content */}
        <div className={`space-y-2 ${
          isUser
            ? 'bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-3'
            : 'text-gray-800 dark:text-gray-200'
        }`}>
          {message.content.map((block, index) => {
            switch (block.type) {
              case 'text':
                return (
                  <div key={index} className={isUser ? '' : 'bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700'}>
                    <TextBlock text={block.text} />
                  </div>
                );
              case 'thinking':
                return (
                  <div key={index}>
                    <ThinkingBlock thinking={block.thinking} />
                  </div>
                );
              case 'tool_use':
                return (
                  <div key={index}>
                    <ToolUseBlock name={block.name} input={block.input} />
                  </div>
                );
              default:
                return null;
            }
          })}

          {/* Tool results (for user messages) */}
          {message.toolResults && message.toolResults.length > 0 && (
            <div className="space-y-2 mt-2">
              {message.toolResults.map((result, index) => (
                <ToolResultBlock
                  key={index}
                  content={result.content}
                  isError={result.is_error}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
