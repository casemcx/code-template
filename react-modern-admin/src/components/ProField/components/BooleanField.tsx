import type { BooleanFieldProps, ProFieldBaseProps } from '../types';

export interface BooleanFieldComponentProps extends ProFieldBaseProps {
  fieldProps?: BooleanFieldProps;
}

/**
 * 布尔字段渲染组件
 */
const BooleanField = ({
  value,
  emptyText = '-',
  fieldProps,
  className,
}: BooleanFieldComponentProps) => {
  // 空值处理
  if (value === undefined || value === null || value === '') {
    return <span className={className}>{emptyText}</span>;
  }

  const { trueText = '是', falseText = '否' } = fieldProps || {};
  const text = value ? trueText : falseText;

  return <span className={className}>{text}</span>;
};

BooleanField.displayName = 'BooleanField';

export default BooleanField;
