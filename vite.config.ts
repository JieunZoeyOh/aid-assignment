import { defineConfig } from "vite";
import "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupVitest.ts",
    include: ["./src/test/**/*.test.tsx"],
  },
  server: {
    port: 3000,
  },
});
