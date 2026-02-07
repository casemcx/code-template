import { useCallback, useMemo } from 'react';
import { useControllableValue } from './useControllableValue';

export type UseArrayToggleOptions<T> = {
  /** 受控值 */
  value?: T[];
  /** 默认值（非受控模式） */
  defaultValue?: T[];
  /** 值变化时的回调 */
  onChange?: (values: T[]) => void;
};

export type UseArrayToggleActions<T> = {
  /** 切换某项：存在则移除，不存在则添加 */
  toggle: (item: T) => void;
  /** 添加一项（已存在则忽略） */
  add: (item: T) => void;
  /** 移除一项 */
  remove: (item: T) => void;
  /** 添加多项 */
  addMany: (items: T[]) => void;
  /** 移除多项 */
  removeMany: (items: T[]) => void;
  /** 判断某项是否存在（O(1)） */
  has: (item: T) => boolean;
  /** 重置为默认值 */
  reset: () => void;
};

export type UseArrayToggleReturn<T> = [
  /** 当前值数组 */
  values: T[],
  /** 设置值（接收数组） */
  setValues: (values: T[]) => void,
  /** 操作方法集合 */
  actions: UseArrayToggleActions<T>,
];

/**
 * 基于 Map 的数组切换 Hook，支持受控与非受控模式
 *
 * @description
 * 内部使用 `Map<T, true>` 做状态管理和 O(1) 查找，通过 useMemo 计算导出数组。
 * 受控/非受控逻辑委托给 `useControllableValue`。
 *
 * @example
 * ```tsx
 * // 非受控模式
 * const [selectedKeys, setSelectedKeys, { toggle, has }] = useArrayToggle<string>({
 *   defaultValue: ['home'],
 * });
 * setSelectedKeys(['home', 'about']); // 直接设置数组
 *
 * // 受控模式
 * const [selectedKeys, setSelectedKeys, { toggle, has }] = useArrayToggle<string>({
 *   value: props.selectedKeys,
 *   onChange: props.onSelectedKeysChange,
 * });
 * ```
 */
export function useArrayToggle<T>(
  options: UseArrayToggleOptions<T> = {},
): UseArrayToggleReturn<T> {
  const { defaultValue = [] } = options;

  // 内部用 Map 管理状态，通过转换器与外部 T[] 交互
  const [map, setMap] = useControllableValue<Map<T, true>>({
    value: options.value
      ? new Map(options.value.map(item => [item, true]))
      : undefined,
    defaultValue: new Map(defaultValue.map(item => [item, true])),
    onChange: options.onChange
      ? newMap => options.onChange!(Array.from(newMap.keys()))
      : undefined,
  });

  // 用 useMemo 计算导出的数组
  const values = useMemo(() => Array.from(map.keys()), [map]);

  /** 切换某项 */
  const toggle = useCallback(
    (item: T) => {
      setMap(prev => {
        const next = new Map(prev);
        if (next.has(item)) {
          next.delete(item);
        } else {
          next.set(item, true);
        }
        return next;
      });
    },
    [setMap],
  );

  /** 添加一项 */
  const add = useCallback(
    (item: T) => {
      setMap(prev => {
        if (prev.has(item)) return prev;
        const next = new Map(prev);
        next.set(item, true);
        return next;
      });
    },
    [setMap],
  );

  /** 移除一项 */
  const remove = useCallback(
    (item: T) => {
      setMap(prev => {
        if (!prev.has(item)) return prev;
        const next = new Map(prev);
        next.delete(item);
        return next;
      });
    },
    [setMap],
  );

  /** 添加多项 */
  const addMany = useCallback(
    (items: T[]) => {
      setMap(prev => {
        const newItems = items.filter(item => !prev.has(item));
        if (newItems.length === 0) return prev;
        const next = new Map(prev);
        newItems.forEach(item => next.set(item, true));
        return next;
      });
    },
    [setMap],
  );

  /** 移除多项 */
  const removeMany = useCallback(
    (items: T[]) => {
      setMap(prev => {
        const itemsToRemove = items.filter(item => prev.has(item));
        if (itemsToRemove.length === 0) return prev;
        const next = new Map(prev);
        itemsToRemove.forEach(item => next.delete(item));
        return next;
      });
    },
    [setMap],
  );

  /** 判断某项是否存在（O(1)） */
  const has = useCallback((item: T) => map.has(item), [map]);

  /** 设置值（接收数组，内部转为 Map） */
  const setValues = useCallback(
    (newValues: T[]) => {
      setMap(new Map(newValues.map(item => [item, true])));
    },
    [setMap],
  );

  /** 重置为默认值 */
  const reset = useCallback(() => {
    setMap(new Map(defaultValue.map(item => [item, true])));
  }, [defaultValue, setMap]);

  const actions = useMemo(
    () => ({ toggle, add, remove, addMany, removeMany, has, reset }),
    [toggle, add, remove, addMany, removeMany, has, reset],
  );

  return [values, setValues, actions];
}
