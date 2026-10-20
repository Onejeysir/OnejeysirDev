import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Pour GitHub Pages sur https://onejeysir.github.io/<repo>/ : base: "/<repo>/"
export default defineConfig({ plugins: [react()], base: "/" });
