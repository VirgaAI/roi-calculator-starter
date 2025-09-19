import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ospitek/roi-core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
      '@ospitek/roi-widget': path.resolve(__dirname, '../../packages/widget/src/RoiWidget.tsx'),
    },
  },
  optimizeDeps: {
    exclude: ['@ospitek/roi-core', '@ospitek/roi-widget'],
  },
});
