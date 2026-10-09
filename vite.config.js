import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './': rutas relativas para que el despliegue en GitHub Pages
// funcione desde cualquier nombre de repositorio sin configuración extra.
export default defineConfig({
  plugins: [react()],
  base: './',
});
