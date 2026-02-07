import type zhCN from './zh-CN';

export type LocaleKey = keyof typeof zhCN;

export type Language = 'zh-CN' | 'en-US';

export interface LangOption {
  key: Language;
  label: string;
}
