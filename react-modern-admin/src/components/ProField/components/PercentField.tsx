import type { PercentFieldProps, ProFieldBaseProps } from '../types';

export interface PercentFieldComponentProps extends ProFieldBaseProps {
  fieldProps?: PercentFieldProps;
}

/**
 * 百分比字段渲染组件
 */
const PercentField = ({
  value,
  emptyText = '-',
  fieldProps,
  className,
}: PercentFieldComponentProps) => {
  // 空值处理
  if (value === undefined || value === null || value === '') {
    return <span className={className}>{emptyText}</span>;
  }

  const num = Number(value);
  if (Number.isNaN(num)) {
    return <span className={className}>{String(value)}</span>;
  }

  const { precision, showSymbol = true } = fieldProps || {};

  let formatted: string;
  if (precision !== undefined) {
    formatted = num.toFixed(precision);
  } else {
    formatted = num.toLocaleString();
  }

  return (
    <span className={className}>
      {formatted}
      {showSymbol && '%'}
    </span>
  );
};

PercentField.displayName = 'PercentField';

export default PercentField;
