/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd());
  return {
    plugins: [dts({
      outDir: 'types',
      copyDtsFiles: false
    })],
    build: {
      lib: {
        entry: './src/index.ts',
        name: 'enum',
        fileName: (format) => {
          let fileType = 'js';
          switch (format) {
            case 'es':
              fileType = 'mjs';
              break;
            case 'cjs':
              fileType = 'cjs';
              break;
            case 'umd':
              fileType = 'js';
              break;
            default:
              break;
          }
          return `${format}/index.${fileType}`
        },
        formats: ['es', 'cjs', 'umd']
      },
      minify: 'oxc',
      outDir: './dist',
      sourcemap: false,
      emptyOutDir: true,
      rollupOptions: {
        external: ['vite', 'handlebars', 'node:fs', 'node:path', 'fs', 'path']
      }
    },
    test: {
      testTimeout: 20_000,
      // environment: 'happy-dom',
      // // 启用浏览器环境测试
      // browser: {
      //   enabled: true,
      //   provider: 'playwright',
      //   instances: [
      //     {
      //       browser: 'chromium'
      //     },
      //   ],
      // },
      // // 设置全局测试环境
      // globals: true,
    }
  }
})
