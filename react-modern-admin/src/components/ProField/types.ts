import type { TagColor } from '@douyinfe/semi-ui/lib/es/tag';
import type { ReactNode } from 'react';

/**
 * 选项项类型
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
  color?: TagColor;
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
  | 'custom';

// ============ 各类型 FieldProps 定义 ============

/**
 * 文本字段配置
 */
export interface TextFieldProps {
  /**
   * 是否可复制
   */
  copyable?: boolean;
}

/**
 * 数字字段配置
 */
export interface NumberFieldProps {
  /**
   * 小数精度
   */
  precision?: number;
  /**
   * 千分位分隔符
   * @default true
   */
  thousandSeparator?: boolean;
}

/**
 * 日期字段配置
 */
export interface DateFieldProps {
  /**
   * 日期格式
   * @default 'YYYY-MM-DD'
   */
  format?: string;
}

/**
 * 日期时间字段配置
 */
export interface DateTimeFieldProps {
  /**
   * 日期时间格式
   * @default 'YYYY-MM-DD HH:mm:ss'
   */
  format?: string;
}

/**
 * 时间字段配置
 */
export interface TimeFieldProps {
  /**
   * 时间格式
   * @default 'HH:mm:ss'
   */
  format?: string;
}

/**
 * 金额字段配置
 */
export interface MoneyFieldProps {
  /**
   * 货币符号
   * @default '¥'
   */
  symbol?: string;
  /**
   * 小数精度
   * @default 2
   */
  precision?: number;
  /**
   * 千分位分隔符
   * @default true
   */
  thousandSeparator?: boolean;
}

/**
 * 百分比字段配置
 */
export interface PercentFieldProps {
  /**
   * 小数精度
   */
  precision?: number;
  /**
   * 是否显示百分号
   * @default true
   */
  showSymbol?: boolean;
}

/**
 * 选择器字段配置
 */
export interface SelectFieldProps {
  /**
   * 选项列表
   */
  optionList?: OptionItem[];
}

/**
 * 状态字段配置
 */
export interface StatusFieldProps {
  /**
   * 选项列表
   */
  optionList?: OptionItem[];
}

/**
 * 布尔字段配置
 */
export interface BooleanFieldProps {
  /**
   * 真值显示文本
   * @default '是'
   */
  trueText?: string;
  /**
   * 假值显示文本
   * @default '否'
   */
  falseText?: string;
}

// ============ ProField Props 联合类型 ============

/**
 * ProField 基础属性
 */
export interface ProFieldBaseProps {
  /**
   * 要渲染的值
   */
  value: unknown;
  /**
   * 空值显示文本
   * @default '-'
   */
  emptyText?: string;
  /**
   * 是否显示省略号
   */
  ellipsis?: boolean;
  /**
   * 自定义渲染函数
   */
  render?: (value: unknown) => ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * ProField 组件属性（联合类型，根据 type 推断 fieldProps）
 */
export type ProFieldProps =
  | (ProFieldBaseProps & {
      type?: 'text' | 'textarea';
      fieldProps?: TextFieldProps;
    })
  | (ProFieldBaseProps & { type: 'number'; fieldProps?: NumberFieldProps })
  | (ProFieldBaseProps & { type: 'date'; fieldProps?: DateFieldProps })
  | (ProFieldBaseProps & { type: 'dateTime'; fieldProps?: DateTimeFieldProps })
  | (ProFieldBaseProps & { type: 'time'; fieldProps?: TimeFieldProps })
  | (ProFieldBaseProps & { type: 'money'; fieldProps?: MoneyFieldProps })
  | (ProFieldBaseProps & { type: 'percent'; fieldProps?: PercentFieldProps })
  | (ProFieldBaseProps & {
      type: 'select' | 'treeSelect' | 'radio';
      fieldProps?: SelectFieldProps;
    })
  | (ProFieldBaseProps & { type: 'status'; fieldProps?: StatusFieldProps })
  | (ProFieldBaseProps & {
      type: 'switch' | 'checkbox';
      fieldProps?: BooleanFieldProps;
    })
  | (ProFieldBaseProps & {
      type: 'custom';
      fieldProps?: Record<string, unknown>;
    });
