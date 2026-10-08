import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        success: "waitlist/success/index.html",
        error: "waitlist/error/index.html",
      },
    },
  },
});
