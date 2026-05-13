import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 读取文件
 * @param paths 文件路径
 * @returns
 */
export const readFile = (...paths: string[]) => {
  return readFileSync(join(process.cwd(), ...paths), 'utf-8');
};
