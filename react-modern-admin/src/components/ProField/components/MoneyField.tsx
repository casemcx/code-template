import type { MoneyFieldProps, ProFieldBaseProps } from '../types';

export interface MoneyFieldComponentProps extends ProFieldBaseProps {
  fieldProps?: MoneyFieldProps;
}

/**
 * 金额字段渲染组件
 */
const MoneyField = ({
  value,
  emptyText = '-',
  fieldProps,
  className,
}: MoneyFieldComponentProps) => {
  // 空值处理
  if (value === undefined || value === null || value === '') {
    return <span className={className}>{emptyText}</span>;
  }

  const num = Number(value);
  if (Number.isNaN(num)) {
    return <span className={className}>{String(value)}</span>;
  }

  const {
    symbol = '¥',
    precision = 2,
    thousandSeparator = true,
  } = fieldProps || {};

  let formatted: string;
  if (thousandSeparator) {
    formatted = num.toLocaleString('zh-CN', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  } else {
    formatted = num.toFixed(precision);
  }

  return (
    <span className={className}>
      {symbol}
      {formatted}
    </span>
  );
};

MoneyField.displayName = 'MoneyField';

export default MoneyField;
