import { type OptionItem, ProField } from '@/components/ProField';
import { Form } from '@douyinfe/semi-ui';
import type { RadioGroupProps } from '@douyinfe/semi-ui/lib/es/radio';
import ProFormItem from '../../ProFormItem';
import type { ProFormItemProps } from '../../types';

export type ProRadioFormItemProps<
  Name extends string = string,
  Value = any,
> = Omit<
  ProFormItemProps<Name, RadioGroupProps, Value>,
  'render' | 'renderFormItem'
> & {
  fieldProps?: RadioGroupProps;
};

const ProRadioFormItem = <Name extends string = string>(
  props: ProRadioFormItemProps<Name>,
) => {
  const { label, fieldProps, ...rests } = props;

  // 转换 options 为 OptionItem 格式
  const optionList: OptionItem[] | undefined = fieldProps?.options?.map(opt => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return { value: opt.value as string | number, label: opt.label };
  });

  return (
    <ProFormItem<Name, RadioGroupProps>
      label={label}
      {...fieldProps}
      {...rests}
      renderFormItem={config => <Form.RadioGroup {...config} />}
      render={value => (
        <Form.Slot label={label}>
          <ProField type="radio" value={value} fieldProps={{ optionList }} />
        </Form.Slot>
      )}
    />
  );
};

ProRadioFormItem.displayName = 'ProRadioFormItem';

export default ProRadioFormItem;
