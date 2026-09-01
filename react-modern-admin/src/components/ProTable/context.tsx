import type { BasicRecord } from '@/types';
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface ProTableContextValue<T extends BasicRecord = BasicRecord> {
  /**
   * 当前选中行 keys
   */
  selectedRowKeys: (string | number)[];
  /**
   * 已选中的行数据
   */
  selectedRows: T[];
  /**
   * 设置选中行；传入 rows 时可同步选中数据
   */
  setSelectedRowKeys: (keys: (string | number)[], rows?: T[]) => void;
  /**
   * 清空选中
   */
  clearSelected: () => void;
}

export const ProTableContext = createContext<ProTableContextValue | null>(null);

/**
 * 在表格外部共享选中态。包在 ProTable 之外，兄弟节点即可 useProTableContext。
 */
export function ProTableProvider({ children }: { children: ReactNode }) {
  const [selectedRowKeys, setSelectedRowKeysState] = useState<
    (string | number)[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<BasicRecord[]>([]);

  const setSelectedRowKeys = useCallback(
    (keys: (string | number)[], rows?: BasicRecord[]) => {
      setSelectedRowKeysState(keys);
      if (rows) {
        setSelectedRows(rows);
        return;
      }
      if (keys.length === 0) {
        setSelectedRows([]);
      }
    },
    [],
  );

  const clearSelected = useCallback(() => {
    setSelectedRowKeysState([]);
    setSelectedRows([]);
  }, []);

  const value = useMemo<ProTableContextValue>(
    () => ({
      selectedRowKeys,
      selectedRows,
      setSelectedRowKeys,
      clearSelected,
    }),
    [selectedRowKeys, selectedRows, setSelectedRowKeys, clearSelected],
  );

  return (
    <ProTableContext.Provider value={value}>
      {children}
    </ProTableContext.Provider>
  );
}

export function useProTableContext<T extends BasicRecord = BasicRecord>() {
  const context = useContext(ProTableContext);
  if (!context) {
    throw new Error('useProTableContext 必须在 ProTableProvider 内使用');
  }
  return context as ProTableContextValue<T>;
}
