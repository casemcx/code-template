import { type OptionItem, ProField } from '@/components/ProField';
import { useLocale } from '@/locales';
import { clsx } from '@/utils';
import { Form } from '@douyinfe/semi-ui';
import type { SelectProps } from '@douyinfe/semi-ui/lib/es/select';
import ProFormItem from '../../ProFormItem';
import type { ProFormItemProps } from '../../types';

export type ProSelectFormItemProps<
  Name extends string = string,
  Value = any,
> = Omit<
  ProFormItemProps<Name, SelectProps, Value>,
  'render' | 'renderFormItem'
> & {
  fieldProps?: SelectProps;
};

const ProSelectFormItem = <Name extends string = string>(
  props: ProSelectFormItemProps<Name>,
) => {
  const { label, placeholder, fieldProps, ...rests } = props;
  const { pleaseSelectField } = useLocale();

  const defaultPlaceholder =
    typeof label === 'string' ? pleaseSelectField(label) : '';

  return (
    <ProFormItem<Name, SelectProps>
      label={label}
      {...fieldProps}
      {...rests}
      placeholder={placeholder ?? defaultPlaceholder}
      renderFormItem={config => (
        <Form.Select
          {...config}
          className={clsx('w-full', config?.className)}
        />
      )}
      render={value => (
        <Form.Slot label={label}>
          <ProField
            type="select"
            value={value}
            fieldProps={{ optionList: fieldProps?.optionList as OptionItem[] }}
          />
        </Form.Slot>
      )}
    />
  );
};

ProSelectFormItem.displayName = 'ProSelectFormItem';

export default ProSelectFormItem;
