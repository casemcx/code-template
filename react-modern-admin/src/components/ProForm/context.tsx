import type { ColProps } from '@douyinfe/semi-ui/lib/es/grid';
import { createContext, useContext } from 'react';

export interface ProFormContextValue {
  readonly: boolean;
  colProps?: ColProps;
}

export const ProFormContext = createContext<ProFormContextValue>({
  readonly: false,
});

export const useProFormContext = () => useContext(ProFormContext);
