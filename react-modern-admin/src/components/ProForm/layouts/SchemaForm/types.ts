import type { BasicRecord } from '@/types/mapping';
import type { ProFormItemProps, ProTextFormItemProps } from '../../FormItem';
import type { ProTextAreaFormItemProps } from '../../FormItem';
import type { ProInputNumberFormItemProps } from '../../FormItem';
import type { ProSelectFormItemProps } from '../../FormItem';
import type { ProTreeSelectFormItemProps } from '../../FormItem';
import type { ProDateFormItemProps } from '../../FormItem';
import type { ProTimeFormItemProps } from '../../FormItem';
import type { ProSwitchFormItemProps } from '../../FormItem';
import type { ProCheckboxFormItemProps } from '../../FormItem';
import type { ProRadioFormItemProps } from '../../FormItem';
import type { ProFormProps } from '../../types';

/**
 * Schema 字段基础类型
 *
 * 通过 type 字段区分不同的表单控件类型，每种类型对应特定的 ProFormItem 组件
 *
 * @template T - 表单数据类型
 * @template Name - 字段名称类型，必须是 T 的键
 *
 * @example
 * ```ts
 * const schema: SchemaProps<UserForm> = {
 *   type: 'text',
 *   name: 'username',
 *   label: '用户名',
 * };
 * ```
 */
export type SchemaProps<
  T extends BasicRecord,
  Name extends keyof T & string = keyof T & string,
> =
  | (ProTextFormItemProps<Name, T[Name]> & { type: 'text' })
  | (ProTextAreaFormItemProps<Name, T[Name]> & { type: 'textarea' })
  | (ProInputNumberFormItemProps<Name, T[Name]> & { type: 'number' })
  | (ProSelectFormItemProps<Name, T[Name]> & { type: 'select' })
  | (ProTreeSelectFormItemProps<Name, T[Name]> & { type: 'treeSelect' })
  | (ProDateFormItemProps<Name, T[Name]> & { type: 'date' })
  | (ProTimeFormItemProps<Name, T[Name]> & { type: 'time' })
  | (ProSwitchFormItemProps<Name, T[Name]> & { type: 'switch' })
  | (ProCheckboxFormItemProps<Name, T[Name]> & { type: 'checkbox' })
  | (ProRadioFormItemProps<Name, T[Name]> & { type: 'radio' })
  | (ProFormItemProps<Name, never, T[Name]> & { type?: 'custom' });

/**
 * SchemaForm 组件属性类型
 *
 * @template T - 表单数据类型
 */
export type SchemaFormProps<T extends BasicRecord> = Omit<
  ProFormProps,
  'children'
> & {
  /**
   * 表单字段配置列表
   */
  columns: SchemaProps<T>[];

  /**
   * 是否作为子组件渲染（不包裹 ProForm 容器）
   * @default false
   */
  asChild?: boolean;
};
