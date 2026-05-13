import { ResultCode } from './result-code';
import type {
  ResultErrorOptions,
  ResultOptions,
  ResultSuccessOptions,
} from './types';

export class Result<T = unknown> {
  success: ResultOptions<T>['success'];
  code: ResultOptions<T>['code'];
  message: ResultOptions<T>['message'];
  data?: ResultOptions<T>['data'];
  error?: ResultOptions<T>['error'];

  constructor(options: ResultOptions<T>) {
    this.success = options.success;
    this.code = options.code;
    this.message = options.message;
    this.data = options.data;
    this.error = options.error;
  }

  static success<
    T,
    R extends ResultSuccessOptions<T> = ResultSuccessOptions<T>,
  >(options: R) {
    const {
      success = true,
      code = ResultCode.SUCCESS,
      message = 'success',
      data,
      error = null,
    } = options;
    return new Result<T>({
      success,
      code,
      message,
      data,
      error,
    });
  }

  static error<T, R extends ResultErrorOptions<T> = ResultErrorOptions<T>>(
    options: R,
  ) {
    const {
      success = false,
      code = ResultCode.UNKNOWN_ERROR,
      message,
      data,
      error = null,
    } = options;
    return new Result<T>({
      success,
      code,
      message,
      data,
      error,
    });
  }

  get value() {
    return {
      success: this.success,
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}
