import {
  BooleanField,
  DateField,
  MoneyField,
  NumberField,
  PercentField,
  SelectField,
  StatusField,
  TextField,
} from './components';
import type { ProFieldProps } from './types';

/**
 * ProField - 通用字段值渲染组件
 *
 * 根据 type 属性动态渲染对应的字段值展示组件
 *
 * @example
 * ```tsx
 * // 文本
 * <ProField value="Hello" />
 *
 * // 数字
 * <ProField type="number" value={1234.56} />
 *
 * // 日期
 * <ProField type="date" value="2024-01-01" />
 *
 * // 金额
 * <ProField type="money" value={1234.56} />
 *
 * // 选择器
 * <ProField
 *   type="select"
 *   value={1}
 *   fieldProps={{ optionList: [{ value: 1, label: '选项1' }] }}
 * />
 *
 * // 状态
 * <ProField
 *   type="status"
 *   value="success"
 *   fieldProps={{
 *     optionList: [
 *       { value: 'success', label: '成功', status: 'success' },
 *       { value: 'error', label: '失败', status: 'error' },
 *     ]
 *   }}
 * />
 *
 * // 自定义渲染
 * <ProField
 *   type="custom"
 *   value={data}
 *   render={(value) => <CustomComponent data={value} />}
 * />
 * ```
 */
const ProField = (props: ProFieldProps) => {
  const {
    type = 'text',
    value,
    emptyText,
    ellipsis,
    render,
    className,
  } = props;

  // 自定义渲染优先
  if (render) {
    return <>{render(value)}</>;
  }

  // 提取 fieldProps（使用 any 避免联合类型推断问题）
  const fieldProps = 'fieldProps' in props ? props.fieldProps : undefined;

  // 基础 props
  const baseProps = { value, emptyText, ellipsis, className };

  // 根据类型渲染对应组件
  switch (type) {
    case 'text':
    case 'textarea':
      return <TextField {...baseProps} fieldProps={fieldProps as any} />;

    case 'number':
      return <NumberField {...baseProps} fieldProps={fieldProps as any} />;

    case 'date':
      return (
        <DateField
          {...baseProps}
          fieldProps={fieldProps as any}
          defaultFormat="YYYY-MM-DD"
        />
      );

    case 'dateTime':
      return (
        <DateField
          {...baseProps}
          fieldProps={fieldProps as any}
          defaultFormat="YYYY-MM-DD HH:mm:ss"
        />
      );

    case 'time':
      return (
        <DateField
          {...baseProps}
          fieldProps={fieldProps as any}
          defaultFormat="HH:mm:ss"
        />
      );

    case 'money':
      return <MoneyField {...baseProps} fieldProps={fieldProps as any} />;

    case 'percent':
      return <PercentField {...baseProps} fieldProps={fieldProps as any} />;

    case 'select':
    case 'treeSelect':
    case 'radio':
      return <SelectField {...baseProps} fieldProps={fieldProps as any} />;

    case 'status':
      return <StatusField {...baseProps} fieldProps={fieldProps as any} />;

    case 'switch':
    case 'checkbox':
      return <BooleanField {...baseProps} fieldProps={fieldProps as any} />;

    case 'custom':
      // 自定义类型需要提供 render
      return <span className={className}>{emptyText || '-'}</span>;

    default:
      return <TextField {...baseProps} fieldProps={fieldProps as any} />;
  }
};

ProField.displayName = 'ProField';

export default ProField;
