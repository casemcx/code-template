import type { Form } from '@douyinfe/semi-ui';
import type { ButtonProps } from '@douyinfe/semi-ui/lib/es/button';
import type { ColProps, RowProps } from '@douyinfe/semi-ui/lib/es/grid';
import type {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  ReactNode,
  Ref,
} from 'react';

import type { BasicRecord } from '@/types/mapping';
import type { FormApi } from '@douyinfe/semi-ui/lib/es/form/interface';

export type FormInstance<T extends BasicRecord = BasicRecord> = FormApi<T>;

export type FormActionProps = HTMLAttributes<HTMLDivElement> &
  Pick<
    ProFormProps,
    | 'submitText'
    | 'submitButtonProps'
    | 'showSubmit'
    | 'showReset'
    | 'resetButtonProps'
    | 'resetText'
  > & {
    /**
     * 加载中
     */
    loading?: boolean;
    /**
     * 是否隐藏
     */
    hidden?: boolean;

    /**
     * @description 前
     */
    before?: ReactNode;

    /**
     * @description 后
     */
    after?: ReactNode;
  };

export interface ProFormProps<T extends BasicRecord = BasicRecord>
  extends Omit<
    ComponentPropsWithoutRef<typeof Form>,
    'onSubmit' | 'getFormApi' | 'className'
  > {
  /**
   * @description 自定义渲染内容
   */
  children?: ReactNode;

  /**
   * @description 是否显示提交按钮
   * @default true
   */
  showSubmit?: boolean;

  /**
   * @description 是否显示重置按钮
   * @default true
   */
  showReset?: boolean;

  /**
   * @description 提交按钮文本
   * @default "提交"
   */
  submitText?: string;

  /**
   * @description 重置按钮文本
   * @default "重置"
   */
  resetText?: string;

  /**
   * @description 表单项的栅格配置
   * @default { span: 24 }
   */
  colProps?: ColProps;

  /**
   * @description 表单项之间的间距
   * @default 16
   */
  gutter?: number | [number, number];

  /**
   * @description 操作按钮的对齐方式
   * @default "end"
   */
  actionsAlign?: 'start' | 'center' | 'end';

  /**
   * @description 是否为只读模式（详情展示模式）
   * @default false
   */
  readonly?: boolean;

  /**
   * @description 表单提交回调
   */
  onSubmit?: (values: T) => void | Promise<void>;

  /**
   * @description 表单底部内容
   */
  footer?: ReactNode;

  /**
   * @description 提交按钮属性
   */
  submitButtonProps?: ButtonProps;

  /**
   * @description 重置按钮属性
   */
  resetButtonProps?: ButtonProps;

  /**
   * @description 表单栅格配置
   */
  rowProps?: RowProps;

  /**
   * @description 表单类名
   */
  className?: string;

  /**
   * @description 表单引用
   */
  formRef?: Ref<FormInstance<T> | undefined>;

  /**
   * @description 操作按钮属性
   */
  actionProps?: FormActionProps;

  /**
   * @description 是否内嵌到form
   */
  inlineAction?: boolean;
}
