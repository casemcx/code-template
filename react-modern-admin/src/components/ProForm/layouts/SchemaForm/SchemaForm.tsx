import type { BasicRecord } from '@/types/mapping';
import { Row } from '@douyinfe/semi-ui';
import { omit } from 'lodash-es';
import { useMemo } from 'react';
import ProForm from '../../ProForm';
import SchemaField from './SchemaField';
import type { SchemaFormProps } from './types';

/**
 * SchemaForm - 基于 Schema 配置的表单组件
 *
 * 通过 columns 配置数组自动生成表单字段，支持动态渲染多种表单控件
 *
 * @template T - 表单数据类型
 *
 * @example
 * ```tsx
 * <SchemaForm<UserData>
 *   columns={[
 *     { type: 'text', name: 'username', label: '用户名' },
 *     { type: 'select', name: 'role', label: '角色', fieldProps: { optionList: [...] } },
 *   ]}
 *   onSubmit={handleSubmit}
 * />
 * ```
 */
const SchemaForm = <T extends BasicRecord>(props: SchemaFormProps<T>) => {
  const { columns, asChild, rowProps, ...rests } = props;

  // 缓存表单字段渲染结果，避免不必要的重新渲染
  const ctx = useMemo(() => {
    return columns.map(col => {
      return <SchemaField key={col.name} {...col} />;
    });
  }, [columns]);

  // asChild 模式：直接返回字段数组，不包裹 ProForm 容器
  if (asChild) {
    return (
      <Row {...rowProps} type={rowProps?.type ?? 'flex'}>
        {ctx}
      </Row>
    );
  }

  return (
    <ProForm {...omit(rests, ['columns', 'children'])} rowProps={rowProps}>
      {ctx}
    </ProForm>
  );
};

export default SchemaForm;
