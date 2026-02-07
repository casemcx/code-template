import { ProField } from '@/components/ProField';
import { useLocale } from '@/locales';
import { Form } from '@douyinfe/semi-ui';
import type { InputProps } from '@douyinfe/semi-ui/lib/es/input';
import ProFormItem from '../../ProFormItem';
import type { ProFormItemProps } from '../../types';

export type ProTextFormItemProps<
  Name extends string = string,
  Value = any,
> = Omit<
  ProFormItemProps<Name, InputProps, Value>,
  'render' | 'renderFormItem'
> & {
  fieldProps?: InputProps;
};

const ProTextFormItem = <Name extends string = string>(
  props: ProTextFormItemProps<Name>,
) => {
  const { label, placeholder, fieldProps, ...rests } = props;
  const { pleaseEnterField } = useLocale();

  const defaultPlaceholder =
    typeof label === 'string' ? pleaseEnterField(label) : '';

  return (
    <ProFormItem<Name, InputProps>
      label={label}
      {...fieldProps}
      {...rests}
      placeholder={placeholder ?? defaultPlaceholder}
      renderFormItem={config => <Form.Input {...config} />}
      render={value => (
        <Form.Slot label={label}>
          <ProField type="text" value={value} />
        </Form.Slot>
      )}
    />
  );
};

ProTextFormItem.displayName = 'ProTextFormItem';

export default ProTextFormItem;
