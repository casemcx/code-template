import { useLocale } from '@/locales';
import { clsx } from '@/utils';
import { Button, Space } from '@douyinfe/semi-ui';
import React from 'react';
import type { FormActionProps } from './types';

const FormActions: React.FC<FormActionProps> = props => {
  const intl = useLocale();

  const {
    className,
    loading = false,
    showReset = true,
    showSubmit = true,
    submitText = intl.get('common.submit'),
    resetText = intl.get('common.reset'),
    submitButtonProps,
    resetButtonProps,
    hidden,
    before,
    after,
    inline = false,
  } = props;

  return (
    <div
      className={clsx(
        'flex',
        inline ? 'items-end' : 'w-full pt-4',
        className,
        {
          hidden: hidden,
        },
      )}
    >
      {!hidden && (
        <Space>
          {before}
          {showReset && (
            <Button htmlType="reset" disabled={loading} {...resetButtonProps}>
              {resetText}
            </Button>
          )}
          {showSubmit && (
            <Button
              type="primary"
              theme="solid"
              htmlType="submit"
              loading={loading}
              {...submitButtonProps}
            >
              {submitText}
            </Button>
          )}
          {after}
        </Space>
      )}
    </div>
  );
};

export default React.memo(FormActions);
