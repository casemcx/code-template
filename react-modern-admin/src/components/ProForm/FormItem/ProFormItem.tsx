import { Col } from '@douyinfe/semi-ui';
import { useFormState } from '@douyinfe/semi-ui';
import { merge, omit } from 'lodash-es';
import { useMemo } from 'react';
import { useProFormContext } from '../context';
import type { ProFormItemProps } from './types';

const ProFormItem = <Name extends string, Props = any, Value = any>(
  props: ProFormItemProps<Name, Props, Value>,
) => {
  const {
    name,
    hidden,
    colProps: propsColProps,
    renderFormItem,
    render,
  } = props;

  const propsReadonly = 'readOnly' in props ? props.readOnly : undefined;
  const { readonly: formReadonly, colProps: formColProps } =
    useProFormContext();

  const colProps = useMemo(() => {
    return merge({}, formColProps, propsColProps);
  }, [propsColProps, formColProps]);

  // 核心逻辑1: 计算 readonly 状态（FormItem 优先于 ProForm）
  const readonly = useMemo(
    () => propsReadonly ?? formReadonly ?? false,
    [propsReadonly, formReadonly],
  );

  // 核心逻辑2: hidden 为 true 时不渲染（包括 Col）
  if (hidden) {
    return null;
  }

  const formState = useFormState();
  const value = formState?.values?.[name];

  // 只读模式：使用 useFormState 获取表单值
  if (readonly) {
    return <Col {...colProps}>{render?.(value)}</Col>;
  }

  // 编辑模式：直接渲染 field
  return (
    <Col {...colProps}>
      {renderFormItem?.(
        merge(
          omit(props, ['render', 'renderFormItem', 'colProps']),
          {
            field: props.name,
          },
          props.fieldProps,
        ),
      )}
    </Col>
  );
};

ProFormItem.displayName = 'ProFormItem';

export default ProFormItem;
