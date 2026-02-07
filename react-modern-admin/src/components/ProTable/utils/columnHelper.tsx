import type { SchemaProps } from '@/components/ProForm';
import type { BasicRecord } from '@/types';
import type { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import type { ReactNode } from 'react';
import CopyableText from '../components/CopyableText';
import type { ProColumns, ProTableActionRef } from '../types';
import {
  getSearchTypeFromValueType,
  renderEllipsis,
  renderValueType,
} from './valueTypeRenderer';

/**
 * 将 ProColumns 转换为 Semi ColumnProps
 */
export const convertToSemiColumns = <T extends BasicRecord>(
  columns: ProColumns<T>[],
  actionRef: ProTableActionRef,
): ColumnProps<T>[] => {
  return columns
    .filter(col => !col.hideInTable)
    .map(col => {
      const {
        name,
        label,
        type,
        fieldProps,
        render,
        copyable,
        ellipsis,
        search,
        hideInTable,
        hideInSearch,
        sortKey,
        // 过滤掉 SchemaProps 特有的属性
        placeholder,
        disabled,
        hidden,
        colProps,
        renderFormItem,
        ...rest
      } = col;

      // 安全获取 optionList
      const fieldPropsObj = fieldProps as Record<string, unknown> | undefined;
      const optionList = fieldPropsObj?.optionList as
        | { value: string | number; label: ReactNode }[]
        | undefined;

      return {
        ...rest,
        title: label,
        dataIndex: name,
        render: (text: unknown, record: T, index: number) => {
          // 1. 自定义渲染优先
          if (render) {
            return render(text, record, index, actionRef);
          }

          // 2. type 渲染（使用 fieldProps.optionList 进行值映射）
          let displayValue = renderValueType(text, type, optionList);

          // 3. ellipsis 处理
          if (ellipsis && displayValue !== null) {
            displayValue = renderEllipsis(displayValue);
          }

          // 4. copyable 处理
          if (copyable && text !== undefined && text !== null && text !== '') {
            displayValue = (
              <CopyableText text={String(text)}>{displayValue}</CopyableText>
            );
          }

          return displayValue;
        },
      } as ColumnProps<T>;
    });
};

/**
 * 将 ProColumns 转换为 SchemaProps（搜索表单）
 * 直接复用 fieldProps，无需额外转换
 */
export const convertToSchemaProps = <T extends BasicRecord>(
  columns: ProColumns<T>[],
): SchemaProps<Record<string, unknown>>[] => {
  return columns
    .filter(col => {
      // 操作列不生成搜索项
      if (col.type === 'option') return false;
      // 显式隐藏的不显示
      if (col.hideInSearch) return false;
      // search 显式设置为 false 时不显示
      if (col.search === false) return false;
      // 默认显示搜索项（search 默认为 true）
      return true;
    })
    .map(col => {
      const searchConfig = typeof col.search === 'object' ? col.search : {};

      const searchType =
        searchConfig.type || getSearchTypeFromValueType(col.type);

      // 如果无法确定搜索类型，默认使用 text
      const finalType = searchType || 'text';

      return {
        type: finalType,
        name: searchConfig.name || col.name,
        label: col.label,
        placeholder: col.placeholder,
        fieldProps: { ...col.fieldProps, ...searchConfig.fieldProps },
        colProps: searchConfig.colProps,
      } as SchemaProps<Record<string, unknown>>;
    });
};
