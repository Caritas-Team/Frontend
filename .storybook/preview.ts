// .storybook\preview.ts
import type { Preview } from '@storybook/react-vite';
import '../src/variables.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;

// ✅ Добавлено: принудительно применяем шрифт из variables.css
// Storybook подгружает свой Nunito Sans, поэтому мы переопределяем его
const style = document.createElement('style');
style.textContent = `
  :root,
  body,
  * {
    font-family: var(--font-family, 'Nunito Sans', sans-serif) !important;
  }
`;
document.head.appendChild(style);
