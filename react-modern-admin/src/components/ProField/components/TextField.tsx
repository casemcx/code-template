import { Typography } from '@douyinfe/semi-ui';
import type { ProFieldBaseProps, TextFieldProps } from '../types';

export interface TextFieldComponentProps extends ProFieldBaseProps {
  fieldProps?: TextFieldProps;
}

/**
 * 文本字段渲染组件
 */
const TextField = ({
  value,
  emptyText = '-',
  ellipsis,
  fieldProps,
  className,
}: TextFieldComponentProps) => {
  // 空值处理
  if (value === undefined || value === null || value === '') {
    return <span className={className}>{emptyText}</span>;
  }

  const text = String(value);

  // 可复制文本
  if (fieldProps?.copyable) {
    return (
      <Typography.Text
        copyable
        ellipsis={ellipsis ? { showTooltip: true } : false}
        className={className}
      >
        {text}
      </Typography.Text>
    );
  }

  // 带省略号
  if (ellipsis) {
    return (
      <Typography.Text ellipsis={{ showTooltip: true }} className={className}>
        {text}
      </Typography.Text>
    );
  }

  return <span className={className}>{text}</span>;
};

TextField.displayName = 'TextField';

export default TextField;
