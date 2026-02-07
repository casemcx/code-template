import { ProField } from '@/components/ProField';
import { useLocale } from '@/locales';
import { Form } from '@douyinfe/semi-ui';
import type { TimePickerProps } from '@douyinfe/semi-ui/lib/es/timePicker';
import ProFormItem from '../../ProFormItem';
import type { ProFormItemProps } from '../../types';

export type ProTimeFormItemProps<
  Name extends string = string,
  Value = any,
> = Omit<
  ProFormItemProps<Name, TimePickerProps, Value>,
  'render' | 'renderFormItem'
> & {
  fieldProps?: TimePickerProps;
};

const ProTimeFormItem = <Name extends string = string>(
  props: ProTimeFormItemProps<Name>,
) => {
  const { label, placeholder, fieldProps, ...rests } = props;
  const { pleaseSelectField } = useLocale();

  const defaultPlaceholder =
    typeof label === 'string' ? pleaseSelectField(label) : '';

  return (
    <ProFormItem<Name, TimePickerProps>
      label={label}
      {...fieldProps}
      {...rests}
      placeholder={placeholder ?? defaultPlaceholder}
      renderFormItem={config => <Form.TimePicker {...config} />}
      render={value => (
        <Form.Slot label={label}>
          <ProField
            type="time"
            value={value}
            fieldProps={{ format: fieldProps?.format as string }}
          />
        </Form.Slot>
      )}
    />
  );
};

ProTimeFormItem.displayName = 'ProTimeFormItem';

export default ProTimeFormItem;
