// .storybook\main.ts
import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: async viteConfig => {
    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: {
        '@': path.resolve(__dirname, '../src'),
        '@assets': path.resolve(__dirname, '../src/assets'),
      },
    };
    return viteConfig;
  },
};
export default config;
