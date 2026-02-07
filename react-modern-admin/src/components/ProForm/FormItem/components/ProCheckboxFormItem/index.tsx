import { type OptionItem, ProField } from '@/components/ProField';
import { Form } from '@douyinfe/semi-ui';
import type { CheckboxGroupProps } from '@douyinfe/semi-ui/lib/es/checkbox';
import ProFormItem from '../../ProFormItem';
import type { ProFormItemProps } from '../../types';

export type ProCheckboxFormItemProps<
  Name extends string = string,
  Value = any,
> = Omit<
  ProFormItemProps<Name, CheckboxGroupProps, Value>,
  'render' | 'renderFormItem'
> & {
  fieldProps?: CheckboxGroupProps;
};

const ProCheckboxFormItem = <Name extends string = string>(
  props: ProCheckboxFormItemProps<Name>,
) => {
  const { label, fieldProps, ...rests } = props;

  // 转换 options 为 OptionItem 格式
  const optionList: OptionItem[] | undefined = fieldProps?.options?.map(
    opt => ({
      value: opt.value as string | number,
      label: opt.label,
    }),
  );

  return (
    <ProFormItem<Name, CheckboxGroupProps>
      label={label}
      {...fieldProps}
      {...rests}
      renderFormItem={config => <Form.CheckboxGroup {...config} />}
      render={value => (
        <Form.Slot label={label}>
          <ProField type="select" value={value} fieldProps={{ optionList }} />
        </Form.Slot>
      )}
    />
  );
};

ProCheckboxFormItem.displayName = 'ProCheckboxFormItem';

export default ProCheckboxFormItem;
