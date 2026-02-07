import { ProField } from '@/components/ProField';
import { useLocale } from '@/locales';
import { clsx } from '@/utils';
import { Form } from '@douyinfe/semi-ui';
import type { DatePickerProps } from '@douyinfe/semi-ui/lib/es/datePicker';
import ProFormItem from '../../ProFormItem';
import type { ProFormItemProps } from '../../types';

export type ProDateFormItemProps<
  Name extends string = string,
  Value = any,
> = Omit<
  ProFormItemProps<Name, DatePickerProps, Value>,
  'render' | 'renderFormItem'
> & {
  fieldProps?: DatePickerProps;
};

const ProDateFormItem = <Name extends string = string>(
  props: ProDateFormItemProps<Name>,
) => {
  const { label, placeholder, fieldProps, ...rests } = props;
  const { pleaseSelectField } = useLocale();

  const defaultPlaceholder =
    typeof label === 'string' ? pleaseSelectField(label) : '';

  // 根据 type 判断是日期还是日期时间
  const showTime =
    fieldProps?.type === 'dateTime' || fieldProps?.type === 'dateTimeRange';

  return (
    <ProFormItem<Name, DatePickerProps>
      label={label}
      {...fieldProps}
      {...rests}
      placeholder={placeholder ?? defaultPlaceholder}
      renderFormItem={config => (
        <Form.DatePicker
          {...config}
          className={clsx('w-full', config.className)}
        />
      )}
      render={value => (
        <Form.Slot label={label}>
          <ProField
            type={showTime ? 'dateTime' : 'date'}
            value={value}
            fieldProps={{ format: fieldProps?.format as string }}
          />
        </Form.Slot>
      )}
    />
  );
};

ProDateFormItem.displayName = 'ProDateFormItem';

export default ProDateFormItem;
