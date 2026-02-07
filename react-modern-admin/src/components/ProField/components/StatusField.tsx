import { Tag } from '@douyinfe/semi-ui';
import type { TagColor } from '@douyinfe/semi-ui/lib/es/tag';
import type { OptionItem, ProFieldBaseProps, StatusFieldProps } from '../types';

export interface StatusFieldComponentProps extends ProFieldBaseProps {
  fieldProps?: StatusFieldProps;
}

/**
 * 状态颜色映射
 */
const statusColors: Record<string, TagColor> = {
  success: 'green',
  error: 'red',
  warning: 'orange',
  default: 'grey',
  processing: 'blue',
};

/**
 * 状态字段渲染组件
 */
const StatusField = ({
  value,
  emptyText = '-',
  fieldProps,
  className,
}: StatusFieldComponentProps) => {
  // 空值处理
  if (value === undefined || value === null || value === '') {
    return <span className={className}>{emptyText}</span>;
  }

  const { optionList } = fieldProps || {};
  if (!optionList || optionList.length === 0) {
    return <span className={className}>{String(value)}</span>;
  }

  const option = optionList.find((opt: OptionItem) => opt.value === value);
  if (!option) {
    return <span className={className}>{String(value)}</span>;
  }

  const color = option.color || statusColors[option.status || 'default'];

  return (
    <span className={className}>
      <Tag color={color}>{option.label}</Tag>
    </span>
  );
};

StatusField.displayName = 'StatusField';

export default StatusField;
