import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080, // Sostituisci con la porta desiderata

    proxy: {
      "/api": {
        target: "http://localhost:3000", // Sostituisci con la porta del tuo server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
