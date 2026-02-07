import { ProField } from '@/components/ProField';
import { useLocale } from '@/locales';
import { clsx } from '@/utils';
import { Form } from '@douyinfe/semi-ui';
import type { InputNumberProps } from '@douyinfe/semi-ui/lib/es/inputNumber';
import ProFormItem from '../../ProFormItem';
import type { ProFormItemProps } from '../../types';

export type ProInputNumberFormItemProps<
  Name extends string = string,
  Value = any,
> = Omit<
  ProFormItemProps<Name, InputNumberProps, Value>,
  'render' | 'renderFormItem'
> & {
  fieldProps?: InputNumberProps;
};

const ProInputNumberFormItem = <Name extends string = string>(
  props: ProInputNumberFormItemProps<Name>,
) => {
  const { label, placeholder, fieldProps, ...rests } = props;
  const { pleaseEnterField } = useLocale();

  const defaultPlaceholder =
    typeof label === 'string' ? pleaseEnterField(label) : '';

  return (
    <ProFormItem<Name, InputNumberProps>
      label={label}
      {...fieldProps}
      {...rests}
      placeholder={placeholder ?? defaultPlaceholder}
      renderFormItem={config => (
        <Form.InputNumber
          {...config}
          className={clsx('w-full', config.className)}
        />
      )}
      render={value => (
        <Form.Slot label={label}>
          <ProField
            type="number"
            value={value}
            fieldProps={{ precision: fieldProps?.precision }}
          />
        </Form.Slot>
      )}
    />
  );
};

ProInputNumberFormItem.displayName = 'ProInputNumberFormItem';

export default ProInputNumberFormItem;
