import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      external: ["electron"],
      output: {
        manualChunks: {
          "monaco-editor": ["monaco-editor", "@monaco-editor/react"],
          "xterm": ["@xterm/xterm", "@xterm/addon-fit", "@xterm/addon-web-links"],
          "vendor": ["react", "react-dom", "zustand", "fuse.js"],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "zustand", "lucide-react"],
    exclude: ["@monaco-editor/react"],
  },
});
