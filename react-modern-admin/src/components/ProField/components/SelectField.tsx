import type { OptionItem, ProFieldBaseProps, SelectFieldProps } from '../types';

export interface SelectFieldComponentProps extends ProFieldBaseProps {
  fieldProps?: SelectFieldProps;
}

/**
 * 选择器字段渲染组件
 */
const SelectField = ({
  value,
  emptyText = '-',
  fieldProps,
  className,
}: SelectFieldComponentProps) => {
  // 空值处理
  if (value === undefined || value === null || value === '') {
    return <span className={className}>{emptyText}</span>;
  }

  const { optionList } = fieldProps || {};
  if (!optionList || optionList.length === 0) {
    return <span className={className}>{String(value)}</span>;
  }

  // 支持多选值（数组）
  if (Array.isArray(value)) {
    const labels = value
      .map(v => {
        const option = optionList.find((opt: OptionItem) => opt.value === v);
        return option?.label ?? String(v);
      })
      .filter(Boolean);

    return <span className={className}>{labels.join(', ')}</span>;
  }

  // 单选值
  const option = optionList.find((opt: OptionItem) => opt.value === value);
  const label = option?.label ?? String(value);

  return <span className={className}>{label}</span>;
};

SelectField.displayName = 'SelectField';

export default SelectField;
