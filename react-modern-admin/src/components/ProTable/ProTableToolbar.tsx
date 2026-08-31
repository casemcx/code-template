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
        'pro-table-toolbar flex w-full min-w-0 items-center',
        className,
      )}
    >
      <div className="pro-table-toolbar-left flex min-w-0 items-center gap-2">
        {title ? (
          <div className="pro-table-toolbar-title truncate text-sm font-semibold text-semi-color-text-0">
            {title}
          </div>
        ) : null}
        {title && subTitle ? (
          <span className="text-semi-color-fill-2">·</span>
        ) : null}
        {subTitle ? (
          <div className="pro-table-toolbar-subtitle shrink-0 text-xs text-semi-color-text-2">
            {subTitle}
          </div>
        ) : null}
      </div>

      {actions?.length || settings ? (
        <div className="pro-table-toolbar-right ml-auto flex shrink-0 items-center gap-1">
          {actions?.map((action, index) => (
            <span key={index}>{action}</span>
          ))}
          {settings}
        </div>
      ) : null}
    </div>
  );
};

ProTableToolbar.displayName = 'ProTableToolbar';

export default ProTableToolbar;
