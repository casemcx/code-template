import type { BasicRecord } from '@/types';
import { clsx } from '@/utils';
import type { RowSelectionProps } from '@douyinfe/semi-ui/lib/es/table';
import { useCallback, useContext, useMemo, useState } from 'react';
import ProTableContent from './ProTableContent';
import ProTableSearch from './ProTableSearch';
import ProTableToolbar from './ProTableToolbar';
import ProTableSettings from './components/ProTableSettings';
import type { ProTableSize } from './components/ProTableSettings';
import { ProTableContext } from './context';
import { useProTableInstance } from './hooks/useProTableInstance';
import { useProTableRequest } from './hooks/useProTableRequest';
import type {
  ProTableActionRef,
  ProTableProps,
  ProTableToolbarConfig,
} from './types';

const resolveToolbarSettings = (
  settings?: ProTableToolbarConfig['settings'],
) => {
  if (!settings) {
    return { columns: false, density: false, refresh: false };
  }
  if (settings === true) {
    return { columns: true, density: true, refresh: true };
  }
  return {
    columns: Boolean(settings.columns),
    density: Boolean(settings.density),
    refresh: Boolean(settings.refresh),
  };
};

/**
 * ProTable - 高级表格组件
 *
 * 基于 Semi Design Table 封装，支持：
 * - 配置驱动的搜索表单
 * - 自动数据请求和分页
 * - 工具栏和操作列
 * - 行选择和批量操作
 */
function ProTable<T extends BasicRecord>(props: ProTableProps<T>) {
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

  const tableContext = useContext(ProTableContext);
  const setContextSelectedRowKeys = tableContext?.setSelectedRowKeys;

  const rowSelectionConfig =
    !rowSelection || typeof rowSelection === 'boolean'
      ? undefined
      : rowSelection;
  const isSelectionControlled =
    rowSelectionConfig?.selectedRowKeys !== undefined;
  const userSelectionOnChange = rowSelectionConfig?.onChange;

  const [innerSelectedRowKeys, setInnerSelectedRowKeys] = useState<
    (string | number)[]
  >(() => rowSelectionConfig?.selectedRowKeys ?? []);

  const selectedRowKeys = isSelectionControlled
    ? (rowSelectionConfig.selectedRowKeys ?? [])
    : (tableContext?.selectedRowKeys ?? innerSelectedRowKeys);

  const handleSelectedChange = useCallback(
    (keys: (string | number)[] = [], rows?: T[]) => {
      if (!isSelectionControlled) {
        if (setContextSelectedRowKeys) {
          setContextSelectedRowKeys(keys, rows);
        } else {
          setInnerSelectedRowKeys(keys);
        }
      }
      userSelectionOnChange?.(keys, rows);
    },
    [isSelectionControlled, setContextSelectedRowKeys, userSelectionOnChange],
  );

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

  const clearSelected = useCallback(() => {
    handleSelectedChange([], []);
  }, [handleSelectedChange]);

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
    rowKey:
      typeof rowKey === 'string' || typeof rowKey === 'function'
        ? rowKey
        : undefined,
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
      onChange: handleSelectedChange,
    };
  }, [rowSelection, selectedRowKeys, handleSelectedChange]);

  // 表格显示设置
  const [hiddenColumnKeys, setHiddenColumnKeys] = useState<string[]>([]);
  const [tableSize, setTableSize] = useState<ProTableSize>('default');

  const settingsConfig = resolveToolbarSettings(toolbar?.settings);
  const hasSettings =
    settingsConfig.columns || settingsConfig.density || settingsConfig.refresh;

  const visibleColumns = useMemo(
    () =>
      columns.filter(column => {
        if (column.type === 'option' || !column.name) {
          return true;
        }
        return !hiddenColumnKeys.includes(String(column.name));
      }),
    [columns, hiddenColumnKeys],
  );

  // 工具栏渲染
  const hasTitleRow = Boolean(
    toolbar?.title ||
      toolbar?.subTitle ||
      toolbar?.tools?.length ||
      hasSettings,
  );
  const toolbarActions = toolbar?.actions;
  const hasSearchRow = !hiddenSearch || Boolean(toolbarActions?.length);

  const defaultSubTitle = toolbar?.title
    ? selectedRowKeys.length > 0
      ? `共 ${total} 条 · 已选择 ${selectedRowKeys.length} 项`
      : `共 ${total} 条`
    : undefined;

  return (
    <div className={clsx('pro-table flex flex-col gap-4', className)}>
      <div className="rounded-xl border border-semi-color-border bg-semi-color-bg-1 p-4">
        {hasSearchRow ? (
          <div className="pro-table-search-row mb-3 flex items-center gap-3">
            {!hiddenSearch && (
              <ProTableSearch<T>
                columns={columns}
                onSearch={handleSearch}
                onReset={handleReset}
                {...searchProps}
              />
            )}
            {toolbarActions?.length ? (
              <div className="ml-auto flex min-w-0 items-center gap-2">
                {toolbarActions.map((action, index) => (
                  <span key={index}>{action}</span>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {hasTitleRow ? (
          <ProTableToolbar
            className="mb-2"
            title={toolbar?.title}
            subTitle={toolbar?.subTitle ?? defaultSubTitle}
            actions={toolbar?.tools}
            settings={
              hasSettings ? (
                <ProTableSettings
                  columns={columns}
                  hiddenColumnKeys={hiddenColumnKeys}
                  onHiddenColumnKeysChange={setHiddenColumnKeys}
                  size={tableSize}
                  onSizeChange={setTableSize}
                  onRefresh={reload}
                  loading={loading}
                  showColumns={settingsConfig.columns}
                  showDensity={settingsConfig.density}
                  showRefresh={settingsConfig.refresh}
                />
              ) : null
            }
          />
        ) : null}

        <ProTableContent<T>
          {...restTableProps}
          columns={visibleColumns}
          actionRef={actionRef}
          dataSource={dataSource}
          loading={loading}
          rowKey={rowKey}
          rowSelection={tableRowSelection}
          pagination={tablePagination}
          size={settingsConfig.density ? tableSize : restTableProps.size}
        />
      </div>
    </div>
  );
}

ProTable.displayName = 'ProTable';

export default ProTable;
