import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import pkg from "./package.json";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/flight-log/" : "/",
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [react()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));