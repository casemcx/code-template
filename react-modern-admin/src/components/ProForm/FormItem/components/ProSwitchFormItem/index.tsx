import { ProField } from '@/components/ProField';
import { Form } from '@douyinfe/semi-ui';
import type { SwitchProps } from '@douyinfe/semi-ui/lib/es/switch';
import ProFormItem from '../../ProFormItem';
import type { ProFormItemProps } from '../../types';

export type ProSwitchFormItemProps<
  Name extends string = string,
  Value = any,
> = Omit<
  ProFormItemProps<Name, SwitchProps, Value>,
  'render' | 'renderFormItem'
> & {
  fieldProps?: SwitchProps;
};

const ProSwitchFormItem = <Name extends string = string>(
  props: ProSwitchFormItemProps<Name>,
) => {
  const { label, fieldProps, ...rests } = props;

  return (
    <ProFormItem<Name, SwitchProps>
      label={label}
      {...fieldProps}
      {...rests}
      renderFormItem={config => <Form.Switch {...config} />}
      render={value => (
        <Form.Slot label={label}>
          <ProField type="switch" value={value} />
        </Form.Slot>
      )}
    />
  );
};

ProSwitchFormItem.displayName = 'ProSwitchFormItem';

export default ProSwitchFormItem;
