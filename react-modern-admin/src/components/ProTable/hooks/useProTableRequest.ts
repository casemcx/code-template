import type { BasicRecord } from '@/types';
import { Toast } from '@douyinfe/semi-ui';
import { useRequest } from 'ahooks';
import type React from 'react';
import { useCallback, useState } from 'react';
import type {
  ProTableProps,
  ProTableRequestParams,
  ProTableRequestResult,
} from '../types';

interface UseProTableRequestOptions<T extends BasicRecord> {
  /**
   * 请求函数
   */
  request?: ProTableProps<T>['request'];
  /**
   * 额外参数
   */
  params?: Record<string, unknown>;
  /**
   * 默认分页大小
   */
  defaultPageSize?: number;
  /**
   * 数据加载完成回调
   */
  onLoad?: (data: T[]) => void;
  /**
   * 请求错误回调
   */
  onRequestError?: (error: Error) => void;
}

interface UseProTableRequestReturn<T extends BasicRecord> {
  /**
   * 数据源
   */
  dataSource: T[];
  /**
   * 总数
   */
  total: number;
  /**
   * 加载中
   */
  loading: boolean;
  /**
   * 搜索参数
   */
  searchParams: Record<string, unknown>;
  /**
   * 设置搜索参数
   */
  setSearchParams: (params: Record<string, unknown>) => void;
  /**
   * 分页信息
   */
  pagination: {
    current: number;
    pageSize: number;
  };
  /**
   * 设置分页
   */
  setPagination: React.Dispatch<
    React.SetStateAction<{ current: number; pageSize: number }>
  >;
  /**
   * 排序信息
   */
  sorter?: ProTableRequestParams<T>['sorter'];
  /**
   * 设置排序
   */
  setSorter: (sorter?: ProTableRequestParams<T>['sorter']) => void;
  /**
   * 筛选信息
   */
  filter: Record<string, unknown[]>;
  /**
   * 设置筛选
   */
  setFilter: (filter: Record<string, unknown[]>) => void;
  /**
   * 重新加载数据
   */
  reload: () => Promise<void>;
  /**
   * 重置并刷新
   */
  reset: () => Promise<void>;
}

/**
 * ProTable 数据请求 Hook
 */
export const useProTableRequest = <T extends BasicRecord>(
  options: UseProTableRequestOptions<T>,
): UseProTableRequestReturn<T> => {
  const {
    request,
    params,
    defaultPageSize = 10,
    onLoad,
    onRequestError,
  } = options;

  // 状态管理
  const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: defaultPageSize,
  });
  const [sorter, setSorter] = useState<ProTableRequestParams<T>['sorter']>();
  const [filter, setFilter] = useState<Record<string, unknown[]>>({});

  // 数据请求
  const { data, loading, run } = useRequest(
    async (): Promise<ProTableRequestResult<T>> => {
      if (!request) {
        return { data: [], total: 0, success: true };
      }

      const result = await request({
        params: { ...searchParams, ...params },
        pagination,
        sorter,
        filter,
      });

      return result;
    },
    {
      // 依赖变化时自动请求
      refreshDeps: [searchParams, pagination, sorter, filter, params],
      onSuccess: result => {
        if (result?.data) {
          onLoad?.(result.data);
        }
      },
      onError: error => {
        Toast.error({ content: error.message || '数据加载失败' });
        onRequestError?.(error);
      },
    },
  );

  // 重新加载
  const reload = useCallback(async () => {
    if (request) {
      await run();
    }
  }, [request, run]);

  // 重置并刷新
  const reset = useCallback(async () => {
    setSearchParams({});
    setPagination(prev => ({ ...prev, current: 1 }));
    setSorter(undefined);
    setFilter({});
    // 状态更新后会自动触发 useEffect 中的 run
  }, []);

  return {
    dataSource: data?.data || [],
    total: data?.total || 0,
    loading,
    searchParams,
    setSearchParams,
    pagination,
    setPagination,
    sorter,
    setSorter,
    filter,
    setFilter,
    reload,
    reset,
  };
};

export default useProTableRequest;
