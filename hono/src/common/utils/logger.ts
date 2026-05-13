export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  private readonly prefix: string;
  constructor(module: string) {
    this.prefix = `${new Date().toISOString()} [${module}]`;
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
    console[level](`${this.prefix} ${msg}`, ...args);
  }
}
