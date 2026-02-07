import type { BasicRecord } from '@/types';
import { Table } from '@douyinfe/semi-ui';
import { useMemo } from 'react';
import type { ProTableContentProps } from './types';
import { convertToSemiColumns } from './utils/columnHelper';

/**
 * ProTable 表格内容组件
 */
const ProTableContent = <T extends BasicRecord>(
  props: ProTableContentProps<T>,
) => {
  const { columns, actionRef, ...restProps } = props;

  // 转换为 Semi ColumnProps
  const semiColumns = useMemo(() => {
    return convertToSemiColumns(columns, actionRef);
  }, [columns, actionRef]);

  return <Table<T> {...restProps} columns={semiColumns} />;
};

ProTableContent.displayName = 'ProTableContent';

export default ProTableContent;
