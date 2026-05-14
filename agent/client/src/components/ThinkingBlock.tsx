import { useState } from 'react';

interface ThinkingBlockProps {
  thinking: string;
}

export default function ThinkingBlock({ thinking }: ThinkingBlockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <span className={`transform transition-transform ${expanded ? 'rotate-90' : ''}`}>
          ▶
        </span>
        <span className="font-medium">思考过程</span>
        <span className="ml-auto text-xs text-gray-400">
          {thinking.length} 字符
        </span>
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap break-words leading-relaxed border-t border-gray-200 dark:border-gray-700">
          {thinking}
        </div>
      )}
    </div>
  );
}
