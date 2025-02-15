import "dotenv/config";

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig(() => {
  return {
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    },
    plugins: [
      react(),
      viteCompression(),
      vanillaExtractPlugin({
        identifiers: ({ hash }) => `prefix_${hash}`,
      }),
    ],
    server: {
      host: "0.0.0.0",
      port: 3000,
      proxy: {
        "/api": {
          target: process.env.API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
