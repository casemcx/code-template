import type {
  CommonFieldProps,
  CommonexcludeType,
} from '@douyinfe/semi-ui/lib/es/form';
import type { ColProps } from '@douyinfe/semi-ui/lib/es/grid';
import type { ReactNode } from 'react';

export type Basic<Name extends string = string, Props = any, Value = any> = {
  /**
   * 字段名称
   */
  name: Name;

  /**
   * 占位符文本
   */
  placeholder?: string;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否隐藏表单项
   */
  hidden?: boolean;
  /**
   * 表单控件组件属性
   */
  fieldProps?: Props;
  /**
   * 栅格布局的列配置
   */
  colProps?: ColProps;
  /**
   * 自定义渲染表单项（编辑模式）
   */
  renderFormItem?: (
    props: Omit<
      FormItemProps<Name, Props, Value>,
      'renderFormItem' | 'render' | 'colProps' | 'fieldProps'
    > &
      FormItemProps<Name, Props, Value>['fieldProps'] & {
        field: string;
      },
  ) => ReactNode;
  /**
   * 自定义渲染（只读模式）
   */
  render?: (value: Value) => ReactNode;
};

export type FormItemProps<
  Name extends string = string,
  Props = any,
  Value = any,
> = CommonexcludeType &
  Omit<CommonFieldProps, 'field'> &
  Basic<Name, Props, Value> & {
    readOnly?: boolean;
  };

export type ReadOnlyProps<
  Name extends string = string,
  Props = any,
  Value = any,
> = Omit<CommonFieldProps, 'field'> &
  Basic<Name, Props, Value> & {
    readOnly: true;
  };

/**
 * 表单项 Schema 基础类型
 * @template Name - 字段名称类型
 * @template Type - 表单项类型
 * @template Props - 组件属性类型
 */
export type ProFormItemProps<
  Name extends string = string,
  Props = any,
  Value = any,
> = FormItemProps<Name, Props, Value> | ReadOnlyProps<Name, Props, Value>;
