import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'index.ts',
      name: 'OspitekRoiWidget',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@ospitek/roi-core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@ospitek/roi-core': 'OspitekRoiCore',
        },
      },
    },
  },
});
