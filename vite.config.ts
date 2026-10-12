// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Plesk (Node.js): `npm run build` writes a standalone Node server to dist/server/index.mjs
// (static files in dist/client), started by server.js. Builds on Vercel keep the vercel preset.
// Forwarded as-is to nitro() (the wrapper's typings only list preset/output/cloudflare).
const nitroOptions = {
  // server.js at the root is the Plesk launcher, not a Nitro server entry.
  serverEntry: false,
  ...(process.env.VERCEL
    ? { preset: "vercel" }
    : {
        preset: "node-server",
        output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
      }),
};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: nitroOptions,
});
