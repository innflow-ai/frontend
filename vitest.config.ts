import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: { url: "https://innflow.ai" },
    },
    setupFiles: ["./vitest.setup.ts"],
  },
});
