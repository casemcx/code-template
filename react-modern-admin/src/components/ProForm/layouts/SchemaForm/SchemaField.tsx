import type { BasicRecord } from '@/types/mapping';
import { ProFormItem, type ProFormItemProps } from '../../FormItem';
import ProCheckboxFormItem from '../../FormItem/components/ProCheckboxFormItem';
import ProDateFormItem from '../../FormItem/components/ProDateFormItem';
import ProInputNumberFormItem from '../../FormItem/components/ProInputNumberFormItem';
import ProRadioFormItem from '../../FormItem/components/ProRadioFormItem';
import ProSelectFormItem from '../../FormItem/components/ProSelectFormItem';
import ProSwitchFormItem from '../../FormItem/components/ProSwitchFormItem';
import ProTextAreaFormItem from '../../FormItem/components/ProTextAreaFormItem';
import ProTextFormItem from '../../FormItem/components/ProTextFormItem';
import ProTimeFormItem from '../../FormItem/components/ProTimeFormItem';
import ProTreeSelectFormItem from '../../FormItem/components/ProTreeSelectFormItem';
import type { SchemaProps } from './types';

/**
 * SchemaField - Schema 字段渲染组件
 *
 * 根据 type 属性动态渲染对应的表单控件组件
 *
 * @template T - 表单数据类型
 *
 * @example
 * ```tsx
 * <SchemaField
 *   type="text"
 *   name="username"
 *   label="用户名"
 *   placeholder="请输入用户名"
 * />
 * ```
 */
const SchemaField = <T extends BasicRecord>({
  type,
  ...props
}: SchemaProps<T>) => {
  // 根据 type 类型渲染对应的表单组件
  switch (type) {
    case 'text':
      return <ProTextFormItem {...(props as any)} />;
    case 'textarea':
      return <ProTextAreaFormItem {...(props as any)} />;
    case 'number':
      return <ProInputNumberFormItem {...(props as any)} />;
    case 'select':
      return <ProSelectFormItem {...(props as any)} />;
    case 'treeSelect':
      return <ProTreeSelectFormItem {...(props as any)} />;
    case 'date':
      return <ProDateFormItem {...(props as any)} />;
    case 'time':
      return <ProTimeFormItem {...(props as any)} />;
    case 'switch':
      return <ProSwitchFormItem {...(props as any)} />;
    case 'checkbox':
      return <ProCheckboxFormItem {...(props as any)} />;
    case 'radio':
      return <ProRadioFormItem {...(props as any)} />;
    case 'custom':
      // 自定义渲染类型，使用 renderFormItem 或 render 自定义内容
      return (
        <ProFormItem<string, never, string>
          {...(props as ProFormItemProps<string, never, string>)}
        />
      );
    default:
      return null;
  }
};

SchemaField.displayName = 'SchemaField';

export default SchemaField;
