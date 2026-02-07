import type { NumberFieldProps, ProFieldBaseProps } from '../types';

export interface NumberFieldComponentProps extends ProFieldBaseProps {
  fieldProps?: NumberFieldProps;
}

/**
 * 数字字段渲染组件
 */
const NumberField = ({
  value,
  emptyText = '-',
  fieldProps,
  className,
}: NumberFieldComponentProps) => {
  // 空值处理
  if (value === undefined || value === null || value === '') {
    return <span className={className}>{emptyText}</span>;
  }

  const num = Number(value);
  if (Number.isNaN(num)) {
    return <span className={className}>{String(value)}</span>;
  }

  const { precision, thousandSeparator = true } = fieldProps || {};

  let formatted: string;
  if (thousandSeparator) {
    formatted = num.toLocaleString('zh-CN', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  } else {
    formatted = precision !== undefined ? num.toFixed(precision) : String(num);
  }

  return <span className={className}>{formatted}</span>;
};

NumberField.displayName = 'NumberField';

export default NumberField;
