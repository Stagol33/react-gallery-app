// create-redirects.mjs - ES Module version
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createRedirectFiles() {
  const distDir = path.join(__dirname, 'dist');
  const redirectsPath = path.join(distDir, '_redirects');
  const indexPath = path.join(distDir, 'index.html');
  const errorPath = path.join(distDir, '200.html');

  try {
    // Create _redirects file
    await fs.writeFile(redirectsPath, '/* /index.html 200');
    console.log('Created _redirects file in dist directory');
    
    // Copy index.html to 200.html
    try {
      await fs.access(indexPath);
      await fs.copyFile(indexPath, errorPath);
      console.log('Created 200.html in dist directory');
    } catch (err) {
      console.error('Could not copy index.html to 200.html:', err);
    }
  } catch (error) {
    console.error('Error creating redirect files:', error);
    process.exit(1);
  }
}

createRedirectFiles();
