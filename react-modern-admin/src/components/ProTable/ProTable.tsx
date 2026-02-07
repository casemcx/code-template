import type { BasicRecord } from '@/types';
import { clsx } from '@/utils';
import type { RowSelectionProps } from '@douyinfe/semi-ui/lib/es/table';
import { useCallback, useMemo, useState } from 'react';
import ProTableContent from './ProTableContent';
import ProTableSearch from './ProTableSearch';
import ProTableToolbar from './ProTableToolbar';
import { useProTableInstance } from './hooks/useProTableInstance';
import { useProTableRequest } from './hooks/useProTableRequest';
import type { ProTableActionRef, ProTableProps } from './types';

/**
 * ProTable - 高级表格组件
 *
 * 基于 Semi Design Table 封装，支持：
 * - 配置驱动的搜索表单
 * - 自动数据请求和分页
 * - 工具栏和操作列
 * - 行选择和批量操作
 */
const ProTable = <T extends BasicRecord>(props: ProTableProps<T>) => {
  const {
    columns,
    dataSource: staticDataSource,
    request,
    params,
    toolbar,
    hiddenSearch = false,
    searchProps,
    tableRef,
    rowKey = 'id',
    rowSelection,
    pagination: paginationConfig,
    onSearch,
    onReset,
    onLoad,
    onRequestError,
    className,
    ...restTableProps
  } = props;

  // 选中行状态
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
    [],
  );

  // 表单实例引用（暂时保留，后续可用于获取表单实例）
  // const formRef = useRef<FormInstance<Record<string, unknown>>>();

  // 数据请求
  const {
    dataSource: requestDataSource,
    total,
    loading,
    searchParams,
    setSearchParams,
    pagination,
    setPagination,
    reload,
    reset,
  } = useProTableRequest<T>({
    request,
    params,
    defaultPageSize:
      typeof paginationConfig === 'object' ? paginationConfig.pageSize : 10,
    onLoad,
    onRequestError,
  });

  // 最终数据源（静态数据或请求数据）
  const dataSource = staticDataSource ?? requestDataSource;

  // 清空选中
  const clearSelected = useCallback(() => {
    setSelectedRowKeys([]);
  }, []);

  // 获取搜索参数
  const getSearchParams = useCallback(() => searchParams, [searchParams]);

  // 实例方法
  useProTableInstance<T>({
    tableRef,
    reload,
    reset,
    getSearchParams,
    setSearchParams,
    selectedRowKeys,
    dataSource,
    clearSelected,
    rowKey: typeof rowKey === 'string' ? rowKey : undefined,
  });

  // Action 引用（传递给列的 render 函数）
  const actionRef = useMemo<ProTableActionRef>(
    () => ({
      reload,
      reset,
    }),
    [reload, reset],
  );

  // 搜索处理
  const handleSearch = useCallback(
    (values: Record<string, unknown>) => {
      setSearchParams(values);
      setPagination(prev => ({ ...prev, current: 1 }));
      onSearch?.(values);
    },
    [setSearchParams, setPagination, onSearch],
  );

  // 重置处理
  const handleReset = useCallback(() => {
    setSearchParams({});
    setPagination(prev => ({ ...prev, current: 1 }));
    onReset?.();
  }, [setSearchParams, setPagination, onReset]);

  // 分页配置
  const tablePagination = useMemo(() => {
    if (paginationConfig === false) {
      return false;
    }

    return {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      total,
      onPageChange: (page: number) => {
        setPagination(prev => ({ ...prev, current: page }));
      },
      onPageSizeChange: (pageSize: number) => {
        setPagination({ current: 1, pageSize });
      },
      ...(typeof paginationConfig === 'object' ? paginationConfig : {}),
    };
  }, [pagination, total, paginationConfig, setPagination]);

  // 行选择配置
  const tableRowSelection = useMemo((): RowSelectionProps<T> | undefined => {
    if (!rowSelection) {
      return undefined;
    }

    const baseConfig: RowSelectionProps<T> =
      typeof rowSelection === 'boolean' ? {} : rowSelection;

    return {
      ...baseConfig,
      selectedRowKeys,
      onChange: (
        keys: (string | number)[] | undefined,
        rows: T[] | undefined,
      ) => {
        setSelectedRowKeys(keys || []);
        if (typeof rowSelection !== 'boolean') {
          rowSelection.onChange?.(keys, rows);
        }
      },
    };
  }, [rowSelection, selectedRowKeys]);

  // 工具栏渲染
  const toolbarContent = useMemo(() => {
    if (!toolbar) {
      return null;
    }

    const defaultDom = (
      <ProTableToolbar
        title={toolbar.title}
        subTitle={toolbar.subTitle}
        actions={toolbar.actions}
      />
    );

    if (toolbar.render) {
      return toolbar.render(toolbar, defaultDom);
    }

    return defaultDom;
  }, [toolbar]);

  return (
    <div className={clsx('pro-table flex flex-col gap-3', className)}>
      {/* 搜索表单 */}
      {!hiddenSearch && (
        <ProTableSearch<T>
          columns={columns}
          onSearch={handleSearch}
          onReset={handleReset}
          {...searchProps}
        />
      )}

      {/* 工具栏 */}
      {toolbarContent}

      {/* 表格内容 */}
      <ProTableContent<T>
        columns={columns}
        actionRef={actionRef}
        dataSource={dataSource}
        loading={loading}
        rowKey={rowKey}
        rowSelection={tableRowSelection}
        pagination={tablePagination}
        {...restTableProps}
      />
    </div>
  );
};

ProTable.displayName = 'ProTable';

export default ProTable;
