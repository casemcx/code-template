import { type OptionItem, ProField } from '@/components/ProField';
import { useLocale } from '@/locales';
import { Form } from '@douyinfe/semi-ui';
import type { TreeSelectProps } from '@douyinfe/semi-ui/lib/es/treeSelect';
import ProFormItem from '../../ProFormItem';
import type { ProFormItemProps } from '../../types';

export type ProTreeSelectFormItemProps<
  Name extends string = string,
  Value = any,
> = Omit<
  ProFormItemProps<Name, TreeSelectProps, Value>,
  'render' | 'renderFormItem'
> & {
  fieldProps?: TreeSelectProps;
};

/**
 * 将树形数据扁平化为选项列表
 */
const flattenTreeData = (
  treeData: TreeSelectProps['treeData'],
): OptionItem[] => {
  const result: OptionItem[] = [];
  if (!treeData) return result;

  const traverse = (nodes: typeof treeData) => {
    for (const node of nodes || []) {
      result.push({
        value: node.value as string | number,
        label: node.label,
      });
      if (node.children) {
        traverse(node.children);
      }
    }
  };

  traverse(treeData);
  return result;
};

const ProTreeSelectFormItem = <Name extends string = string>(
  props: ProTreeSelectFormItemProps<Name>,
) => {
  const { label, placeholder, fieldProps, ...rests } = props;
  const { pleaseSelectField } = useLocale();

  const defaultPlaceholder =
    typeof label === 'string' ? pleaseSelectField(label) : '';

  // 将树形数据扁平化为 optionList
  const optionList = flattenTreeData(fieldProps?.treeData);

  return (
    <ProFormItem<Name, TreeSelectProps>
      label={label}
      {...fieldProps}
      {...rests}
      placeholder={placeholder ?? defaultPlaceholder}
      renderFormItem={config => <Form.TreeSelect {...config} />}
      render={value => (
        <Form.Slot label={label}>
          <ProField
            type="treeSelect"
            value={value}
            fieldProps={{ optionList }}
          />
        </Form.Slot>
      )}
    />
  );
};

ProTreeSelectFormItem.displayName = 'ProTreeSelectFormItem';

export default ProTreeSelectFormItem;
