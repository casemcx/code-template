import { ProField } from '@/components/ProField';
import { useLocale } from '@/locales';
import { Form } from '@douyinfe/semi-ui';
import type { TextAreaProps } from '@douyinfe/semi-ui/lib/es/input';
import ProFormItem from '../../ProFormItem';
import type { ProFormItemProps } from '../../types';

export type ProTextAreaFormItemProps<
  Name extends string = string,
  Value = any,
> = Omit<
  ProFormItemProps<Name, TextAreaProps, Value>,
  'render' | 'renderFormItem'
> & {
  fieldProps?: TextAreaProps;
};

const ProTextAreaFormItem = <Name extends string = string>(
  props: ProTextAreaFormItemProps<Name>,
) => {
  const { label, placeholder, fieldProps, ...rests } = props;
  const { pleaseEnterField } = useLocale();

  const defaultPlaceholder =
    typeof label === 'string' ? pleaseEnterField(label) : '';

  return (
    <ProFormItem<Name, TextAreaProps>
      label={label}
      {...fieldProps}
      {...rests}
      placeholder={placeholder ?? defaultPlaceholder}
      renderFormItem={config => <Form.TextArea {...config} />}
      render={value => (
        <Form.Slot label={label}>
          <ProField type="textarea" value={value} />
        </Form.Slot>
      )}
    />
  );
};

ProTextAreaFormItem.displayName = 'ProTextAreaFormItem';

export default ProTextAreaFormItem;
