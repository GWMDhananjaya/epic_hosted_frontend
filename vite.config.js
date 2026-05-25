import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), flowbiteReact()],
  base: "/epic_hosted_frontend/", // Add this line for GitHub Pages
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
});
