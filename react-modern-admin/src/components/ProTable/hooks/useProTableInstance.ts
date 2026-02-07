import type { FormInstance } from '@/components/ProForm';
import type { BasicRecord } from '@/types';
import { type Ref, useCallback, useImperativeHandle, useRef } from 'react';
import type { ProTableInstance } from '../types';

interface UseProTableInstanceOptions<T extends BasicRecord> {
  /**
   * 表格实例引用
   */
  tableRef?: Ref<ProTableInstance<T>>;
  /**
   * 重新加载数据
   */
  reload: () => Promise<void>;
  /**
   * 重置并刷新
   */
  reset: () => Promise<void>;
  /**
   * 获取搜索参数
   */
  getSearchParams: () => Record<string, unknown>;
  /**
   * 设置搜索参数
   */
  setSearchParams: (params: Record<string, unknown>) => void;
  /**
   * 选中行 keys
   */
  selectedRowKeys: (string | number)[];
  /**
   * 数据源
   */
  dataSource: T[];
  /**
   * 清空选中
   */
  clearSelected: () => void;
  /**
   * 行 key 字段
   */
  rowKey?: string | ((record: T) => string | number);
}

/**
 * ProTable 实例方法 Hook
 */
export const useProTableInstance = <T extends BasicRecord>(
  options: UseProTableInstanceOptions<T>,
): {
  formRef: Ref<FormInstance<Record<string, unknown>> | undefined>;
} => {
  const {
    tableRef,
    reload,
    reset,
    getSearchParams,
    setSearchParams,
    selectedRowKeys,
    dataSource,
    clearSelected,
    rowKey = 'id',
  } = options;

  // 表单实例引用
  const formRef = useRef<FormInstance<Record<string, unknown>>>();

  // 获取行的 key
  const getRowKey = useCallback(
    (record: T): string | number => {
      if (typeof rowKey === 'function') {
        return rowKey(record);
      }
      return record[rowKey] as string | number;
    },
    [rowKey],
  );

  // 获取选中行数据
  const getSelectedRows = useCallback((): T[] => {
    return dataSource.filter(record => {
      const key = getRowKey(record);
      return selectedRowKeys.includes(key);
    });
  }, [dataSource, selectedRowKeys, getRowKey]);

  // 获取选中行 keys
  const getSelectedRowKeys = useCallback((): (string | number)[] => {
    return selectedRowKeys;
  }, [selectedRowKeys]);

  // 获取表单实例
  const getFormInstance = useCallback(() => {
    return formRef.current;
  }, []);

  // 暴露实例方法
  useImperativeHandle(
    tableRef,
    () => ({
      reload,
      reset,
      getSelectedRows,
      getSelectedRowKeys,
      clearSelected,
      getSearchParams,
      setSearchParams,
      getFormInstance,
    }),
    [
      reload,
      reset,
      getSelectedRows,
      getSelectedRowKeys,
      clearSelected,
      getSearchParams,
      setSearchParams,
      getFormInstance,
    ],
  );

  return {
    formRef,
  };
};

export default useProTableInstance;
