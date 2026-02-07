import type { BasicRecord } from '@/types/mapping';
import { clsx } from '@/utils';
import { Form, Row } from '@douyinfe/semi-ui';
import { useRequest } from 'ahooks';
import { useCallback, useMemo } from 'react';
import FormAction from './FormAction';
import { ProFormContext } from './context';
import type { FormInstance, ProFormProps } from './types';

const ProForm = <T extends BasicRecord = any>({
  children,
  footer,
  showSubmit = true,
  showReset = true,
  submitText,
  resetText,
  colProps,
  gutter = 16,
  actionsAlign = 'end',
  readonly = false,
  formRef,
  onSubmit,
  submitButtonProps,
  resetButtonProps,
  className,
  rowProps,
  actionProps,
  inlineAction,
  ...formProps
}: ProFormProps<T>) => {
  const formApiRef = useRef<FormInstance<T>>();

  useImperativeHandle(formRef, () => formApiRef.current);

  const { loading, run } = useRequest(
    async (values: any) => {
      // 先进行表单验证，validate() 验证失败时会抛出错误
      await formApiRef.current?.validate();
      // 验证通过后才执行提交回调
      return onSubmit?.(values);
    },
    { manual: true },
  );

  const handleGetFormApi = useCallback(
    (formApi: any) => {
      formApiRef.current = formApi;
    },
    [formApiRef],
  );

  const contextValue = useMemo(
    () => ({ readonly, colProps }),
    [readonly, colProps],
  );

  return (
    <ProFormContext.Provider value={contextValue}>
      <Form
        onSubmit={run}
        getFormApi={handleGetFormApi}
        className={clsx(className, {
          'readonly-form': readonly,
        })}
        {...formProps}
      >
        <Row {...rowProps} type={rowProps?.type ?? 'flex'}>
          {children}
        </Row>
        <div className="form-footer">
          <FormAction
            {...actionProps}
            hidden={readonly}
            showSubmit={showSubmit}
            showReset={showReset}
            submitText={submitText}
            resetText={resetText}
            loading={loading}
            submitButtonProps={submitButtonProps}
            resetButtonProps={resetButtonProps}
          />
          {!!footer && footer}
        </div>
      </Form>
    </ProFormContext.Provider>
  );
};

ProForm.displayName = 'ProForm';

export default ProForm;
