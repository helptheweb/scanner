import { defineConfig } from "tsup";

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  target: 'node20',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});