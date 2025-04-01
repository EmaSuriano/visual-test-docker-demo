// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  preview: { port: 3000 },
});
