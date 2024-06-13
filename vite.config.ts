import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron/simple";

export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: "./main/main.ts",
        vite: {
          build: {
            outDir: "main-dist",
          },
        },
      },
      preload: {
        input: "./main/preload.ts",
        vite: {
          build: {
            outDir: "main-dist",
          },
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
