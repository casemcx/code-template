import { useState } from 'react';

interface ToolUseBlockProps {
  name: string;
  input: Record<string, unknown>;
}

export default function ToolUseBlock({ name, input }: ToolUseBlockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
      >
        <span className="text-blue-500 font-mono">🔧</span>
        <span className="font-mono font-medium text-blue-700 dark:text-blue-300">
          {name}
        </span>
        <span className={`ml-auto transform transition-transform ${expanded ? 'rotate-90' : ''} text-blue-400`}>
          ▶
        </span>
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-blue-200 dark:border-blue-800">
          <pre className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-mono bg-white dark:bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
            {JSON.stringify(input, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
