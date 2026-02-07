import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language, LocaleKey } from './types';

/**
 * 提供常用的验证消息辅助函数
 */
export const useValidationHelpers = () => {
  const { t } = useTranslation();

  return {
    /**
     * 请输入{{field}}
     * @param field 字段名
     * @returns
     */
    pleaseEnterField: (field: string) =>
      t('common.pleaseEnterField', { field }),

    /**
     * 请选择{{field}}
     * @param field 字段名
     * @returns
     */
    pleaseSelectField: (field: string) =>
      t('common.pleaseSelectField', { field }),

    /**
     * 请上传{{field}}
     * @param field 字段名
     * @returns
     */
    pleaseUploadField: (field: string) =>
      t('common.pleaseUploadField', { field }),

    /**
     * {{field}}不能为空
     * @param field 字段名
     * @returns
     */
    fieldRequired: (field: string) => t('common.fieldRequired', { field }),

    /**
     * 格式不正确
     * @returns
     */
    invalidFormat: () => t('common.invalidFormat'),

    /**
     * 请输入有效的邮箱地址
     * @returns
     */
    emailInvalid: () => t('common.emailInvalid'),

    /**
     * 请输入有效的手机号码
     * @returns
     */
    phoneInvalid: () => t('common.phoneInvalid'),

    /**
     * 密码至少需要{{min}}位字符
     * @param min 最小长度
     * @returns
     */
    passwordMinLength: (min: number) => t('common.passwordMinLength', { min }),

    /**
     * 两次输入的密码不一致
     * @returns
     */
    passwordMismatch: () => t('common.passwordMismatch'),

    /**
     * 至少需要{{min}}个字符
     * @param min 最小长度
     * @returns
     */
    minLength: (min: number) => t('common.minLength', { min }),
  };
};

export const useLocale = () => {
  const { t, i18n } = useTranslation();
  const {
    pleaseEnterField,
    pleaseSelectField,
    pleaseUploadField,
    fieldRequired,
    invalidFormat,
    emailInvalid,
    phoneInvalid,
    passwordMinLength,
    passwordMismatch,
    minLength,
  } = useValidationHelpers();

  const lang = useMemo(() => {
    return i18n.language as Language;
  }, [i18n.language]);

  const switchLang = useCallback(
    (l: Language) => {
      i18n.changeLanguage(l);
    },
    [i18n],
  );

  const get = useCallback(
    (key: LocaleKey, config?: any) => {
      return t(key, config) as string;
    },
    [t],
  );

  return {
    lang,
    switchLang,
    get,
    pleaseEnterField,
    pleaseSelectField,
    pleaseUploadField,
    fieldRequired,
    invalidFormat,
    emailInvalid,
    phoneInvalid,
    passwordMinLength,
    passwordMismatch,
    minLength,
  };
};
