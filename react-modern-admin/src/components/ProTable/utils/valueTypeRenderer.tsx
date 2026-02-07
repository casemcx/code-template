import { type OptionItem, ProField } from '@/components/ProField';
import type { SchemaProps } from '@/components/ProForm';
import type { BasicRecord } from '@/types';
import { Typography } from '@douyinfe/semi-ui';
import type { ReactNode } from 'react';
import type { ProColumnExtraType } from '../types';

/**
 * 获取列的 type 对应的表格渲染值类型
 */
type ColumnType = SchemaProps<BasicRecord>['type'] | ProColumnExtraType;

/**
 * 统一渲染入口
 */
export const renderValueType = (
  value: unknown,
  type?: ColumnType,
  optionList?: OptionItem[],
): ReactNode => {
  // 操作列不做默认渲染，由 render 函数处理
  if (type === 'option') {
    return null;
  }

  // 映射 type 到 ProField 的 type
  const fieldType = type === 'textarea' ? 'text' : type;

  return (
    <ProField
      type={fieldType as any}
      value={value}
      fieldProps={{ optionList }}
    />
  );
};

/**
 * 根据 type 获取搜索表单的类型
 */
export const getSearchTypeFromValueType = (
  type?: ColumnType,
): SchemaProps<BasicRecord>['type'] => {
  switch (type) {
    case 'dateTime':
      return 'date';
    case 'money':
    case 'percent':
      return 'number';
    case 'status':
      return 'select';
    case 'option':
      // 操作列不生成搜索项
      return undefined as unknown as SchemaProps<BasicRecord>['type'];
    default:
      return type as SchemaProps<BasicRecord>['type'];
  }
};

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

// 重新导出 OptionItem 类型，保持向后兼容
export type { OptionItem };
