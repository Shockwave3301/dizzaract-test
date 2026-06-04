import path from "node:path";
import fs from "node:fs";
import { defineConfig, type Plugin } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

const base = process.env.BASE_PATH ?? "/dizzaract-test/";

function spaFallback(): Plugin {
  return {
    name: "spa-fallback-404",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const indexHtml = path.join(dist, "index.html");
      if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, path.join(dist, "404.html"));
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? base : "/",
  plugins: [
    react(),
    // React Compiler — automatically memoizes components and hooks.
    // Targets React 19 by default; see https://react.dev/learn/react-compiler
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    spaFallback(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
