import type {
  DateFieldProps,
  DateTimeFieldProps,
  ProFieldBaseProps,
  TimeFieldProps,
} from '../types';

export interface DateFieldComponentProps extends ProFieldBaseProps {
  fieldProps?: DateFieldProps | DateTimeFieldProps | TimeFieldProps;
  /**
   * 默认格式
   */
  defaultFormat?: string;
}

/**
 * 格式化日期
 */
const formatDate = (date: Date, format: string): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * 解析日期值
 */
const parseDate = (value: unknown): Date | null => {
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
};

/**
 * 日期字段渲染组件
 */
const DateField = ({
  value,
  emptyText = '-',
  fieldProps,
  defaultFormat = 'YYYY-MM-DD',
  className,
}: DateFieldComponentProps) => {
  // 空值处理
  if (value === undefined || value === null || value === '') {
    return <span className={className}>{emptyText}</span>;
  }

  const date = parseDate(value);
  if (!date) {
    return <span className={className}>{String(value)}</span>;
  }

  const format = fieldProps?.format || defaultFormat;
  const formatted = formatDate(date, format);

  return <span className={className}>{formatted}</span>;
};

DateField.displayName = 'DateField';

export default DateField;
