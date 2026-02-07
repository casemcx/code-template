import { clsx } from '@/utils';
import type { ProTableToolbarProps } from './types';

/**
 * ProTable 工具栏组件
 */
const ProTableToolbar = (props: ProTableToolbarProps) => {
  const { title, subTitle, actions, settings, className } = props;

  // 如果没有内容，不渲染
  if (!title && !subTitle && !actions?.length && !settings) {
    return null;
  }

  return (
    <div
      className={clsx(
        'pro-table-toolbar flex items-center justify-between py-2',
        className,
      )}
    >
      {/* 左侧区域 */}
      <div className="pro-table-toolbar-left">
        {title && (
          <div className="pro-table-toolbar-title text-lg font-medium">
            {title}
          </div>
        )}
        {subTitle && (
          <div className="pro-table-toolbar-subtitle text-sm text-gray-500">
            {subTitle}
          </div>
        )}
      </div>

      {/* 右侧区域 */}
      <div className="pro-table-toolbar-right flex items-center gap-2">
        {actions?.map((action, index) => (
          <span key={index}>{action}</span>
        ))}
        {settings}
      </div>
    </div>
  );
};

ProTableToolbar.displayName = 'ProTableToolbar';

export default ProTableToolbar;
