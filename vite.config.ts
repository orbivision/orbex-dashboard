/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The client is built to dist/ and served by server/index.mjs. In `npm run dev` the server
// mounts Vite as middleware instead, so there is one port and one origin in both modes.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: { environment: 'node' },
});
