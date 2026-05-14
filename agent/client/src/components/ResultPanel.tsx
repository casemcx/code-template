import type { DisplayResult } from '../types';

interface ResultPanelProps {
  result: DisplayResult;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(1);
  return `${minutes}m ${seconds}s`;
}

export default function ResultPanel({ result }: ResultPanelProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 mb-4">
      <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
        {result.is_error ? '执行失败' : '执行完成'}
      </h3>

      {result.is_error && result.errors && result.errors.length > 0 && (
        <div className="mb-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">错误信息：</p>
          {result.errors.map((err, i) => (
            <p key={i} className="text-xs text-red-500 dark:text-red-300 font-mono">{err}</p>
          ))}
        </div>
      )}

      {result.result && (
        <div className="mb-3 bg-white dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
          {result.result}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-2.5">
          <div className="text-gray-400 mb-0.5">总耗时</div>
          <div className="font-semibold text-gray-700 dark:text-gray-200">
            {formatDuration(result.duration_ms)}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-2.5">
          <div className="text-gray-400 mb-0.5">API 耗时</div>
          <div className="font-semibold text-gray-700 dark:text-gray-200">
            {formatDuration(result.duration_api_ms)}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-2.5">
          <div className="text-gray-400 mb-0.5">对话轮次</div>
          <div className="font-semibold text-gray-700 dark:text-gray-200">
            {result.num_turns}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-2.5">
          <div className="text-gray-400 mb-0.5">总费用</div>
          <div className="font-semibold text-gray-700 dark:text-gray-200">
            ${result.total_cost_usd.toFixed(4)}
          </div>
        </div>
      </div>

      {result.usage && (
        <details className="mt-3">
          <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">
            Token 使用详情
          </summary>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-xs">
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <div className="text-gray-400">输入 Tokens</div>
              <div className="font-medium">{result.usage.inputTokens.toLocaleString()}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <div className="text-gray-400">输出 Tokens</div>
              <div className="font-medium">{result.usage.outputTokens.toLocaleString()}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <div className="text-gray-400">缓存读取</div>
              <div className="font-medium">{result.usage.cacheReadInputTokens.toLocaleString()}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <div className="text-gray-400">缓存创建</div>
              <div className="font-medium">{result.usage.cacheCreationInputTokens.toLocaleString()}</div>
            </div>
          </div>
        </details>
      )}
    </div>
  );
}
