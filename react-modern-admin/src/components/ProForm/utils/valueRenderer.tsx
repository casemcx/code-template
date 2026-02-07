import { Tag, Typography } from '@douyinfe/semi-ui';
import type { TagColor } from '@douyinfe/semi-ui/lib/es/tag';
import type { ReactNode } from 'react';

/**
 * optionList 选项类型
 */
export interface OptionItem {
  value: string | number;
  label: ReactNode;
  /**
   * 状态类型（用于 Tag 颜色）
   */
  status?: 'success' | 'error' | 'warning' | 'default' | 'processing';
  /**
   * 自定义颜色
   */
  color?: string;
}

/**
 * 值渲染配置
 */
export interface ValueRendererOptions {
  /**
   * 选项列表（用于 select/status 类型的值映射）
   */
  optionList?: OptionItem[];
  /**
   * 日期格式
   * @default 'YYYY-MM-DD'
   */
  dateFormat?: string;
  /**
   * 日期时间格式
   * @default 'YYYY-MM-DD HH:mm:ss'
   */
  dateTimeFormat?: string;
  /**
   * 时间格式
   * @default 'HH:mm:ss'
   */
  timeFormat?: string;
  /**
   * 空值显示
   * @default '-'
   */
  emptyText?: string;
}

/**
 * 值类型
 */
export type ValueType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'dateTime'
  | 'time'
  | 'money'
  | 'percent'
  | 'select'
  | 'treeSelect'
  | 'switch'
  | 'checkbox'
  | 'radio'
  | 'status'
  | 'option';

// ============ 日期格式化工具 ============

/**
 * 格式化日期
 */
export const formatDate = (date: Date, format: string): string => {
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
export const parseDate = (value: unknown): Date | null => {
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
};

// ============ 状态颜色映射 ============

const statusColors: Record<string, TagColor> = {
  success: 'green',
  error: 'red',
  warning: 'orange',
  default: 'grey',
  processing: 'blue',
};

// ============ 基础渲染函数 ============

/**
 * 判断值是否为空
 */
export const isEmpty = (value: unknown): boolean => {
  return value === undefined || value === null || value === '';
};

/**
 * 渲染空值
 */
export const renderEmpty = (emptyText = '-'): string => emptyText;

/**
 * 渲染文本
 */
export const renderText = (
  value: unknown,
  options?: ValueRendererOptions,
): ReactNode => {
  if (isEmpty(value)) {
    return renderEmpty(options?.emptyText);
  }
  return String(value);
};

/**
 * 渲染数字
 */
export const renderNumber = (
  value: unknown,
  options?: ValueRendererOptions,
): ReactNode => {
  if (isEmpty(value)) {
    return renderEmpty(options?.emptyText);
  }
  const num = Number(value);
  if (Number.isNaN(num)) {
    return String(value);
  }
  return num.toLocaleString();
};

/**
 * 渲染日期 YYYY-MM-DD
 */
export const renderDate = (
  value: unknown,
  options?: ValueRendererOptions,
): ReactNode => {
  if (isEmpty(value)) {
    return renderEmpty(options?.emptyText);
  }
  const date = parseDate(value);
  if (!date) {
    return String(value);
  }
  return formatDate(date, options?.dateFormat || 'YYYY-MM-DD');
};

/**
 * 渲染日期时间 YYYY-MM-DD HH:mm:ss
 */
export const renderDateTime = (
  value: unknown,
  options?: ValueRendererOptions,
): ReactNode => {
  if (isEmpty(value)) {
    return renderEmpty(options?.emptyText);
  }
  const date = parseDate(value);
  if (!date) {
    return String(value);
  }
  return formatDate(date, options?.dateTimeFormat || 'YYYY-MM-DD HH:mm:ss');
};

/**
 * 渲染时间 HH:mm:ss
 */
export const renderTime = (
  value: unknown,
  options?: ValueRendererOptions,
): ReactNode => {
  if (isEmpty(value)) {
    return renderEmpty(options?.emptyText);
  }
  const date = parseDate(value);
  if (!date) {
    return String(value);
  }
  return formatDate(date, options?.timeFormat || 'HH:mm:ss');
};

/**
 * 渲染金额 ¥1,234.56
 */
export const renderMoney = (
  value: unknown,
  options?: ValueRendererOptions,
): ReactNode => {
  if (isEmpty(value)) {
    return renderEmpty(options?.emptyText);
  }
  const num = Number(value);
  if (Number.isNaN(num)) {
    return String(value);
  }
  return `¥${num.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * 渲染百分比
 */
export const renderPercent = (
  value: unknown,
  options?: ValueRendererOptions,
): ReactNode => {
  if (isEmpty(value)) {
    return renderEmpty(options?.emptyText);
  }
  const num = Number(value);
  if (Number.isNaN(num)) {
    return String(value);
  }
  return `${num.toLocaleString()}%`;
};

/**
 * 渲染布尔值（开关/复选框）
 */
export const renderBoolean = (
  value: unknown,
  options?: ValueRendererOptions,
): ReactNode => {
  if (isEmpty(value)) {
    return renderEmpty(options?.emptyText);
  }
  return value ? '是' : '否';
};

/**
 * 渲染选择器值（基于 optionList 映射文本）
 */
export const renderSelect = (
  value: unknown,
  options?: ValueRendererOptions,
): ReactNode => {
  if (isEmpty(value)) {
    return renderEmpty(options?.emptyText);
  }
  const { optionList } = options || {};
  if (!optionList || optionList.length === 0) {
    return String(value);
  }

  const option = optionList.find(opt => opt.value === value);
  return option?.label ?? String(value);
};

/**
 * 渲染状态标签（基于 optionList，带颜色 Tag）
 */
export const renderStatus = (
  value: unknown,
  options?: ValueRendererOptions,
): ReactNode => {
  if (isEmpty(value)) {
    return renderEmpty(options?.emptyText);
  }
  const { optionList } = options || {};
  if (!optionList || optionList.length === 0) {
    return String(value);
  }

  const option = optionList.find(opt => opt.value === value);
  if (!option) {
    return String(value);
  }

  const color = (option.color ||
    statusColors[option.status || 'default']) as TagColor;

  return <Tag color={color}>{option.label}</Tag>;
};

// ============ 统一渲染入口 ============

/**
 * 根据类型渲染值
 */
export const renderValue = (
  value: unknown,
  type?: ValueType,
  options?: ValueRendererOptions,
): ReactNode => {
  switch (type) {
    case 'text':
    case 'textarea':
      return renderText(value, options);
    case 'number':
      return renderNumber(value, options);
    case 'date':
      return renderDate(value, options);
    case 'dateTime':
      return renderDateTime(value, options);
    case 'time':
      return renderTime(value, options);
    case 'money':
      return renderMoney(value, options);
    case 'percent':
      return renderPercent(value, options);
    case 'switch':
    case 'checkbox':
      return renderBoolean(value, options);
    case 'select':
    case 'treeSelect':
    case 'radio':
      return renderSelect(value, options);
    case 'status':
      return renderStatus(value, options);
    case 'option':
      // 操作列不做默认渲染
      return null;
    default:
      return renderText(value, options);
  }
};

// ============ 辅助渲染函数 ============

/**
 * 渲染带省略号的文本
 */
export const renderEllipsis = (content: ReactNode): ReactNode => {
  if (typeof content === 'string' || typeof content === 'number') {
    return (
      <Typography.Text ellipsis={{ showTooltip: true }}>
        {content}
      </Typography.Text>
    );
  }
  return content;
};
