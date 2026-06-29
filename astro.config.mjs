// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages (project page) 用の設定。
// 独自ドメインに切り替える場合は site を変更し base を '/' にする。
export default defineConfig({
  site: 'https://tanaka-where.github.io',
  base: '/where-partner-portal',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
