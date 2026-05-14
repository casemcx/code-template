import type { ResultCode } from './result-code';

export type ResultOptions<T = unknown> = {
  success: boolean;
  code: ResultCode;
  message: string;
  data?: T;
  error?: unknown;
};

export type ResultSuccessOptions<T = unknown> = ResultInterface<T, 'data'>;
export type ResultErrorOptions<T = unknown> = ResultInterface<
  T,
  'message' | 'code'
>;

export type ResultInterface<
  T = unknown,
  R extends keyof ResultOptions<T> = never,
> = Partial<ResultOptions<T>> & Required<Pick<ResultOptions<T>, R>>;
