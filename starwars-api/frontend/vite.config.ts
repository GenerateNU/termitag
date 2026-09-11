import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all /api requests to the Go backend — no CORS headers needed.
      "/api": "http://localhost:8080",
    },
  },
});
