import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron/simple";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

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
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    port: 3000,
  },
});
