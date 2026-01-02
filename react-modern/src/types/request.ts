import type {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosInterceptorOptions,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import type { Method } from '@/constants';

interface Result {
  code: number;
  msg: string;
  message: string;
}

export interface ResultData<T = string> extends Result {
  data: T;
}

export interface QueryPageResult<T = string> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

export interface QueryPageBase {
  pageNum: number;
  pageSize: number;
  total?: number;
}

export type QueryPage<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  pageNum?: number;
  pageSize?: number;
  total?: number;
} & Partial<T>;

export type CreateAxiosOptions = {
  /**
   * @description 前缀
   */
  baseURL?: string;
  /**
   * @description 默认请求方法
   * @default GET
   */
  default_method?: Method;
  /**
   * @description 请求超时时间
   */
  timeout?: number;
  /**
   * @description 是否携带cookie
   */
  withCredentials?: boolean;
};

export type Middleware = 'request' | 'response';

export type Interceptor<T extends Middleware> = T extends 'request'
  ? AxiosInterceptorManager<InternalAxiosRequestConfig>['use']
  : AxiosInterceptorManager<AxiosResponse>['use'];
