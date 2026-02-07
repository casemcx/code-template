import { useLocale } from '@/locales';
import type { BasicRecord } from '@/types';
import { clsx } from '@/utils';
import { Button, Modal } from '@douyinfe/semi-ui';
import { pick } from 'lodash-es';
import { useCallback, useImperativeHandle, useRef } from 'react';
import {
  type FormActionProps,
  type FormInstance,
  ProForm,
  ProFromAction,
} from '../../index';
import type { ModalFormProps } from './types';

const ModalForm = <T extends BasicRecord>(props: ModalFormProps<T>) => {
  const intl = useLocale();

  const {
    formProps,
    children,
    onSubmit,
    onReset,
    formRef: propsFormRef,
    footer,
    cancelText = intl.get('common.cancel'),
    onCancel,
    ...rests
  } = props;

  const formRef = useRef<FormInstance<T>>();

  useImperativeHandle(propsFormRef, () => formRef.current);

  const handleOk = useCallback(async () => {
    if (!formRef.current) {
      return;
    }

    await formRef.current.validate();

    const values = formRef.current.getValues();

    onSubmit?.(values);
  }, [onSubmit]);

  return (
    <Modal
      {...rests}
      onCancel={onCancel}
      footer={
        footer ? (
          footer
        ) : (
          <ProFromAction
            {...(pick(rests, [
              'submitText',
              'submitButtonProps',
              'showSubmit',
              'showReset',
              'resetButtonProps',
              'resetText',
            ]) as FormActionProps)}
            {...formProps?.actionProps}
            className={clsx('justify-end', formProps?.actionProps?.className)}
            before={<Button onClick={onCancel}>{cancelText}</Button>}
          />
        )
      }
      onOk={handleOk}
    >
      <ProForm<T>
        {...formProps}
        formRef={formRef}
        showSubmit={false}
        showReset={false}
        onSubmit={handleOk}
      >
        {children}
      </ProForm>
    </Modal>
  );
};

export default ModalForm;
