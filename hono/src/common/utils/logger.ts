export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  private readonly module: string;
  constructor(module: string) {
    this.module = module;
  }

  debug(msg: string, ...args: unknown[]): void {
    this.log('debug', msg, args);
  }

  info(msg: string, ...args: unknown[]): void {
    this.log('info', msg, args);
  }

  warn(msg: string, ...args: unknown[]): void {
    this.log('warn', msg, args);
  }

  error(msg: string, ...args: unknown[]): void {
    this.log('error', msg, args);
  }

  private log(level: LogLevel, msg: string, args: unknown[]): void {
    const prefix = `${new Date().toISOString()} [${this.module}]`;
    console[level](`${prefix} ${msg}`, ...args);
  }
}
