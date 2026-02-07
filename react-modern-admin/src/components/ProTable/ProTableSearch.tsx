import { SchemaForm } from '@/components/ProForm';
import type { BasicRecord } from '@/types';
import { clsx } from '@/utils';
import { IconChevronDown, IconChevronUp } from '@douyinfe/semi-icons';
import { Button } from '@douyinfe/semi-ui';
import { useMemo, useState } from 'react';
import type { ProTableSearchProps } from './types';
import { convertToSchemaProps } from './utils/columnHelper';

/**
 * ProTable 搜索表单组件
 */
const ProTableSearch = <T extends BasicRecord>(
  props: ProTableSearchProps<T>,
) => {
  const {
    columns,
    collapsed = true,
    onCollapsedChange,
    defaultCollapsed = false,
    onSearch,
    onReset,
    formRef,
    className,
    colProps = { span: 8 },
    rowProps = { gutter: 20 },
    ...restProps
  } = props;

  const { collapseCount = 24 / (colProps.span ?? 8) } = props;

  // 内部折叠状态
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  // 转换为 SchemaProps
  const schemaColumns = useMemo(() => {
    return convertToSchemaProps(columns);
  }, [columns]);

  // 是否启用折叠功能
  const enableCollapse = collapsed && schemaColumns.length > collapseCount;

  // 需要显示的列（启用折叠且处于折叠状态时只显示前 collapseCount 个）
  const visibleColumns = useMemo(() => {
    if (enableCollapse && isCollapsed) {
      return schemaColumns.slice(0, collapseCount);
    }
    return schemaColumns;
  }, [schemaColumns, enableCollapse, isCollapsed, collapseCount]);

  // 切换折叠状态
  const handleToggleCollapsed = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapsedChange?.(newCollapsed);
  };

  // 搜索处理
  const handleSubmit = (values: T) => {
    onSearch?.(values as Record<string, unknown>);
  };

  // 重置处理
  const handleReset = () => {
    onReset?.();
  };

  // 如果没有搜索列，不渲染
  if (schemaColumns.length === 0) {
    return null;
  }

  return (
    <div className={clsx('pro-table-search', className)}>
      <SchemaForm<Record<string, unknown>>
        inlineAction={true}
        columns={visibleColumns}
        formRef={formRef}
        onSubmit={handleSubmit as (values: Record<string, unknown>) => void}
        onReset={handleReset}
        submitText="搜索"
        resetText="重置"
        showReset
        actionsAlign="end"
        colProps={colProps}
        rowProps={rowProps}
        actionProps={{
          after: enableCollapse ? (
            <Button
              type="tertiary"
              icon={isCollapsed ? <IconChevronDown /> : <IconChevronUp />}
              onClick={() => {
                console.log('toggle collapsed');
                handleToggleCollapsed();
              }}
            >
              {isCollapsed ? '展开' : '收起'}
            </Button>
          ) : undefined,
          className: 'justify-end',
        }}
        {...restProps}
      />
    </div>
  );
};

ProTableSearch.displayName = 'ProTableSearch';

export default ProTableSearch;
