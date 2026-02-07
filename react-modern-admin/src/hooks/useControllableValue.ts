import { useCallback, useRef, useState } from 'react';

export type UseControllableOptions<T> = {
  /** 受控值 */
  value?: T;
  /** 默认值（非受控模式） */
  defaultValue: T;
  /** 值变化时的回调 */
  onChange?: (value: T) => void;
};

export type UseControllableReturn<T> = [
  /** 当前值 */
  value: T,
  /** 设置值（同时触发 onChange） */
  setValue: (value: T | ((prev: T) => T)) => void,
  /** 是否为受控模式 */
  isControlled: boolean,
];

/**
 * 处理受控与非受控状态的通用 Hook
 *
 * @description
 * 当传入 `value` 时为受控模式，组件不维护内部状态，仅通过 `onChange` 通知外部。
 * 当 `value` 为 `undefined` 时为非受控模式，组件内部维护状态，同时通过 `onChange` 通知外部。
 *
 * @example
 * ```tsx
 * // 在组件内部使用
 * const [collapsed, setCollapsed] = useControllable({
 *   value: props.collapsed,
 *   defaultValue: false,
 *   onChange: props.onCollapse,
 * });
 * ```
 */
export function useControllableValue<T>(
  options: UseControllableOptions<T>,
): UseControllableReturn<T> {
  const { value: controlledValue, defaultValue, onChange } = options;

  const isControlled = controlledValue !== undefined;

  // 用 ref 跟踪受控模式，防止在组件生命周期内模式切换
  const isControlledRef = useRef(isControlled);

  if (process.env.NODE_ENV !== 'production') {
    // 开发环境下警告受控/非受控模式切换
    if (isControlledRef.current !== isControlled) {
      console.warn(
        `useControllable: 组件从${isControlledRef.current ? '受控' : '非受控'}模式切换为${isControlled ? '受控' : '非受控'}模式，这可能会导致意外行为。`,
      );
    }
  }

  const [internalValue, setInternalValue] = useState<T>(defaultValue);

  const currentValue = isControlled ? controlledValue : internalValue;

  // 使用 ref 保持 onChange 引用最新，避免不必要的重渲染
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(currentValue)
          : newValue;

      if (!isControlled) {
        setInternalValue(resolvedValue);
      }

      onChangeRef.current?.(resolvedValue);
    },
    [isControlled, currentValue],
  );

  return [currentValue, setValue, isControlled];
}
