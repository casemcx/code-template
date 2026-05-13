export enum ResultCode {
  /** 成功 */
  SUCCESS = 0,
  /** 未知错误 */
  UNKNOWN_ERROR = -1,
  /** 参数错误 */
  VALIDATION_ERROR = 400,
  /** 未授权 */
  UNAUTHORIZED = 401,
  /** 禁止访问 */
  FORBIDDEN = 403,
  /** 未找到 */
  NOT_FOUND = 404,
  /** 方法不允许 */
  METHOD_NOT_ALLOWED = 405,
  /** 冲突 */
  CONFLICT = 409,
  /** 内部服务器错误 */
  INTERNAL_SERVER_ERROR = 500,
}
