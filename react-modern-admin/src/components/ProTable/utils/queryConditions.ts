import type { OptionItem } from '@/components/ProField';
import type { BasicRecord } from '@/types';
import type { ProColumns } from '../types';
import { getSearchTypeFromValueType } from './valueTypeRenderer';

export type QueryOperator =
  | 'contains'
  | 'eq'
  | 'neq'
  | 'in'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte';

export type QueryFieldType =
  | 'text'
  | 'select'
  | 'number'
  | 'date'
  | 'status';

export type QueryCondition = {
  id: string;
  field?: string;
  operator: QueryOperator;
  value?: unknown;
};

export type QueryFieldOption = {
  name: string;
  label: string;
  type: QueryFieldType;
  optionList?: OptionItem[];
};

const OPERATOR_LABELS: Record<QueryOperator, string> = {
  contains: '包含',
  eq: '等于',
  neq: '不等于',
  in: '存在',
  gt: '大于',
  lt: '小于',
  gte: '不早于',
  lte: '不晚于',
};

export const getOperatorLabel = (operator: QueryOperator) =>
  OPERATOR_LABELS[operator];

export const getOperatorsByType = (
  type: QueryFieldType,
): QueryOperator[] => {
  switch (type) {
    case 'select':
    case 'status':
      return ['in', 'eq', 'neq'];
    case 'number':
      return ['eq', 'gt', 'lt'];
    case 'date':
      return ['eq', 'gte', 'lte'];
    default:
      return ['contains', 'eq', 'neq'];
  }
};

export const getDefaultOperator = (type: QueryFieldType): QueryOperator =>
  getOperatorsByType(type)[0];

const toQueryFieldType = (type?: string): QueryFieldType => {
  switch (type) {
    case 'select':
    case 'radio':
    case 'checkbox':
    case 'treeSelect':
      return 'select';
    case 'status':
      return 'status';
    case 'number':
    case 'money':
    case 'percent':
      return 'number';
    case 'date':
    case 'dateTime':
    case 'time':
      return 'date';
    default:
      return 'text';
  }
};

export const getQueryFields = <T extends BasicRecord>(
  columns: ProColumns<T>[],
): QueryFieldOption[] => {
  return columns
    .filter(col => {
      if (col.type === 'option') return false;
      if (col.hideInSearch) return false;
      if (col.search === false) return false;
      return true;
    })
    .map(col => {
      const searchConfig = typeof col.search === 'object' ? col.search : {};
      const searchType =
        searchConfig.type || getSearchTypeFromValueType(col.type);
      const fieldProps = {
        ...col.fieldProps,
        ...searchConfig.fieldProps,
      } as { optionList?: OptionItem[] };

      return {
        name: String(searchConfig.name || col.name),
        label: String(col.label ?? col.name),
        type: toQueryFieldType(col.type || searchType),
        optionList: fieldProps.optionList,
      };
    });
};

export const isEmptyQueryValue = (value: unknown) => {
  if (value === undefined || value === null || value === '') {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return false;
};

export const getActiveConditions = (conditions: QueryCondition[]) =>
  conditions.filter(
    item => Boolean(item.field) && !isEmptyQueryValue(item.value),
  );

const QUERY_OVERLAY_SELECTOR = [
  '.semi-select-option-list',
  '.semi-datepicker-panel',
  '.semi-datepicker-yearpanel',
  '.semi-datepicker-monthpanel',
].join(', ');

export const isQueryOverlayOpen = () =>
  typeof document !== 'undefined' &&
  Boolean(document.querySelector(QUERY_OVERLAY_SELECTOR));

export const buildSearchParams = (
  keyword: string,
  conditions: QueryCondition[],
): Record<string, unknown> => {
  const params: Record<string, unknown> = {};
  const trimmed = keyword.trim();
  if (trimmed) {
    params.keyword = trimmed;
  }

  for (const condition of getActiveConditions(conditions)) {
    const field = condition.field as string;
    params[field] = condition.value;
    params[`${field}__op`] = condition.operator;
  }

  return params;
};

const toTime = (value: unknown) => {
  if (value instanceof Date) {
    return value.getTime();
  }
  const time = new Date(value as string | number).getTime();
  return Number.isNaN(time) ? null : time;
};

export const matchQueryValue = (
  cell: unknown,
  operator: QueryOperator,
  value: unknown,
) => {
  if (isEmptyQueryValue(value)) {
    return true;
  }

  const list = Array.isArray(value) ? value : [value];
  const equals = (left: unknown, right: unknown) =>
    left === right || String(left) === String(right);

  switch (operator) {
    case 'contains':
      return String(cell ?? '').includes(String(value));
    case 'eq':
      return list.some(item => equals(cell, item));
    case 'neq':
      return list.every(item => !equals(cell, item));
    case 'in':
      return list.some(item => equals(cell, item));
    case 'gt':
      return Number(cell) > Number(value);
    case 'lt':
      return Number(cell) < Number(value);
    case 'gte': {
      const left = toTime(cell);
      const right = toTime(value);
      return left !== null && right !== null ? left >= right : false;
    }
    case 'lte': {
      const left = toTime(cell);
      const right = toTime(value);
      return left !== null && right !== null ? left <= right : false;
    }
    default:
      return true;
  }
};

export const applySearchParams = <T extends BasicRecord>(
  data: T[],
  params: Record<string, unknown>,
  keywordFields: (keyof T)[] = [],
) => {
  const { keyword, ...rest } = params;
  let result = data;

  if (typeof keyword === 'string' && keyword && keywordFields.length > 0) {
    result = result.filter(item =>
      keywordFields.some(field =>
        String(item[field] ?? '').includes(keyword),
      ),
    );
  }

  const fields = Object.keys(rest).filter(key => !key.endsWith('__op'));
  for (const field of fields) {
    const operator = (rest[`${field}__op`] as QueryOperator) || 'eq';
    const value = rest[field];
    result = result.filter(item =>
      matchQueryValue(item[field], operator, value),
    );
  }

  return result;
};

export const ALL_VIEW_KEY = 'all';

export type SearchViewCondition = {
  field: string;
  operator?: QueryOperator;
  value?: unknown;
};

export const hydrateViewConditions = (
  items: SearchViewCondition[] | undefined,
  fields: QueryFieldOption[],
  createId: () => string,
): QueryCondition[] => {
  if (!items?.length) {
    return [];
  }
  return items.map(item => {
    const field = fields.find(option => option.name === item.field);
    return {
      id: createId(),
      field: item.field,
      operator:
        item.operator ?? getDefaultOperator(field?.type ?? 'text'),
      value: item.value,
    };
  });
};

export const toViewConditions = (
  conditions: QueryCondition[],
): SearchViewCondition[] =>
  getActiveConditions(conditions).map(item => ({
    field: item.field as string,
    operator: item.operator,
    value: item.value,
  }));
