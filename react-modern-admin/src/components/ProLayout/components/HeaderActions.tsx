import { Badge, Button, Tooltip } from '@douyinfe/semi-ui';
import { memo } from 'react';
import type { FC } from 'react';
import type { HeaderActionsProps } from '../types';

/**
 * Header 操作按钮组件
 * 渲染通知、帮助等功能按钮
 */
const HeaderActions: FC<HeaderActionsProps> = memo(({ actions }) => {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      {actions.map(action => {
        // 支持自定义渲染
        if (action.render) {
          return <span key={action.key}>{action.render()}</span>;
        }

        const button = (
          <Button
            theme="borderless"
            icon={action.icon}
            className="text-semi-color-text-2 hover:text-semi-color-text-0"
            onClick={action.onClick}
          />
        );

        // 包装 Badge
        const buttonWithBadge =
          action.badge !== undefined ? (
            <Badge
              count={
                typeof action.badge === 'number' ? action.badge : undefined
              }
              dot={action.badge === true}
            >
              {button}
            </Badge>
          ) : (
            button
          );

        // 包装 Tooltip
        if (action.tooltip) {
          return (
            <Tooltip key={action.key} content={action.tooltip}>
              {buttonWithBadge}
            </Tooltip>
          );
        }

        return <span key={action.key}>{buttonWithBadge}</span>;
      })}
    </div>
  );
});

HeaderActions.displayName = 'HeaderActions';

export default HeaderActions;
