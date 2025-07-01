import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

// Get directory name equivalent in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin to create _redirects file
function createRedirectsPlugin() {
  return {
    name: 'create-redirects-file',
    async closeBundle() {
      const redirectsContent = '/* /index.html 200';
      const distDir = path.resolve(__dirname, 'dist');
      
      try {
        await fs.writeFile(path.join(distDir, '_redirects'), redirectsContent);
        console.log('Created _redirects file in dist directory');
      } catch (error) {
        console.error('Error creating _redirects file:', error);
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    createRedirectsPlugin()
  ]
});


