import { ResultCode } from '@/models/result/result-code';

export class HttpError extends Error {
  readonly code: ResultCode;
  // biome-ignore lint/suspicious/noExplicitAny: any is used to store any type of data
  error?: any;

  constructor(code: ResultCode, message: string) {
    super(message);
    this.name = 'HttpError';
    this.code = code;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = '请求参数错误') {
    super(ResultCode.VALIDATION_ERROR, message);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = '未授权访问') {
    super(ResultCode.UNAUTHORIZED, message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = '禁止访问') {
    super(ResultCode.FORBIDDEN, message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message = '资源未找到') {
    super(ResultCode.NOT_FOUND, message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends HttpError {
  constructor(message = '资源冲突') {
    super(ResultCode.CONFLICT, message);
    this.name = 'ConflictError';
  }
}

export class InternalServerError extends HttpError {
  constructor(message = '服务器内部错误') {
    super(ResultCode.INTERNAL_SERVER_ERROR, message);
    this.name = 'InternalServerError';
  }
}

export type ValidationIssue = {
  path: string;
  message: string;
};

export class ValidateError extends HttpError {
  constructor(issues: ValidationIssue[]) {
    super(ResultCode.VALIDATION_ERROR, '请求参数校验失败');
    this.name = 'ValidateError';
    this.error = issues;
  }
}
