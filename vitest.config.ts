import { defineConfig } from "vitest/config";
import { createRequire } from "node:module";

// xdtestutils declares jsdom as an optional peer dependency. Vite otherwise
// stubs it as an unresolved optional peer ("Could not resolve jsdom imported by
// xdtestutils"), so point it at the copy actually installed here.
const require = createRequire(import.meta.url);

export default defineConfig({
  resolve: { alias: { jsdom: require.resolve("jsdom") } },
  test: {
    environment: "node",
    // Only real test files: *.spec.ts plus the *-audit.ts checks. Excludes
    // helper modules like tests/devendor-helpers.ts (which export utilities and
    // define no tests, so loading them as test files would fail).
    include: ["tests/**/*.spec.ts", "tests/**/*-audit.ts"],
    testTimeout: 30_000,
  },
});
