import type { BasicRecord } from '@/types/mapping';
import type { ModalReactProps } from '@douyinfe/semi-ui/lib/es/modal';
import type { ProFormProps } from '../../types';

export type ModalFormProps<T extends BasicRecord> = Omit<
  ModalReactProps,
  'children' | 'onOk'
> &
  Pick<ProFormProps<T>, 'formRef' | 'onSubmit' | 'onReset'> & {
    children?: React.ReactNode;
    formProps?: Omit<ProFormProps<T>, 'children' | 'showSubmit' | 'showReset'>;
  };
