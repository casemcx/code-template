import { useState } from 'react';

interface ToolResultBlockProps {
  content: string;
  isError?: boolean;
}

export default function ToolResultBlock({ content, isError }: ToolResultBlockProps) {
  const [expanded, setExpanded] = useState(false);

  const borderColor = isError
    ? 'border-red-200 dark:border-red-800'
    : 'border-green-200 dark:border-green-800';
  const bgColor = isError
    ? 'bg-red-50 dark:bg-red-900/20'
    : 'bg-green-50 dark:bg-green-900/20';
  const textColor = isError
    ? 'text-red-700 dark:text-red-300'
    : 'text-green-700 dark:text-green-300';

  return (
    <div className={`border ${borderColor} ${bgColor} rounded-lg overflow-hidden`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:opacity-80 transition-colors ${textColor}`}
      >
        <span>{isError ? '❌' : '✅'}</span>
        <span className="font-medium">
          工具结果 {isError ? '(错误)' : ''}
        </span>
        <span className={`ml-auto transform transition-transform ${expanded ? 'rotate-90' : ''}`}>
          ▶
        </span>
      </button>
      {expanded && (
        <div className={`px-3 pb-3 pt-1 border-t ${borderColor}`}>
          <pre className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-mono bg-white dark:bg-gray-800 p-2 rounded mt-1 max-h-60 overflow-y-auto">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}
