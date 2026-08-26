import { SemiRspackPlugin } from '@douyinfe/semi-rspack-plugin';
import { appTools, defineConfig } from '@modern-js/app-tools';
import { polyfillPlugin } from '@modern-js/plugin-polyfill';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
import { pluginGlsl } from 'rsbuild-plugin-glsl';
import AutoImport from 'unplugin-auto-import/rspack';

export const define = Object.keys(process.env)
  .filter(key => key.startsWith('PUBLIC_'))
  .reduce(
    (acc, key) => {
      if (process.env[key]) {
        acc[`process.env.${key}`] = process.env[key];
      }
      return acc;
    },
    {} as Record<string, string>,
  );

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  source: {
    // 定义环境变量，使其在客户端代码中可用
    define,
  },
  tools: {
    rspack: {
      plugins: [
        AutoImport({
          imports: ['react', 'ahooks'],
          dts: './types/auto-imports.d.ts',
        }),
        new SemiRspackPlugin({
          cssLayer: true,
        }),
      ],
    },
  },
  output: {
    sourceMap: true,
  },
  plugins: [appTools(), polyfillPlugin()],
  builderPlugins: [pluginTailwindcss(), pluginGlsl(), pluginSvgr()],
});
