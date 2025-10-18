import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    sourcemap: true,
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    // @ts-expect-error - for now
    tailwindcss(),
  ],
});
