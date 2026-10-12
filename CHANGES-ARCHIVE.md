# Archive — Plesk (Node.js) deployment attempt (removed)

**Status:** removed on 2026-10-12. The project deploys on **Vercel** (`marina-six-iota.vercel.app`).
The client-feedback work (FR/EN, hero, gallery, activities, 3-step berth form, …) is **kept**;
only the Plesk-specific changes were removed.

**Why it was abandoned:** the Topnet Plesk server runs **Node.js 16.20.2**. TanStack Start needs
**Node ≥ 22.12** (Vite 7, ES modules), so the app fails there with `ERR_REQUIRE_ESM` / version errors.

The two Plesk commits are still in the Git history and can be restored at any time:

| Commit    | Date       | Content                                                                      |
| --------- | ---------- | ---------------------------------------------------------------------------- |
| `9f39d6d` | 2026-10-12 | node-server build, `server.js`, `start`/`preview` scripts, `dist/` committed |
| `bbaee28` | 2026-10-12 | `.gitattributes`: no line-ending conversion in `dist/`                       |

## How to bring it back (only on a host with Node ≥ 22.12)

```bash
git checkout bbaee28 -- vite.config.ts package.json .gitignore .gitattributes server.js
npm run build
git add vite.config.ts package.json .gitignore .gitattributes server.js dist
git commit -m "feat: node-server SSR build for Plesk"
```

Rebuild (`npm run build`) and commit `dist/` before **every** push, otherwise the host serves an old build.

## What the Plesk setup changed (exact content)

### `vite.config.ts`

The `nitro` option became an object built before `defineConfig` (the Lovable wrapper's typings only
list `preset/output/cloudflare`, but it forwards every option to `nitro()`):

```ts
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
// …
nitro: nitroOptions,
```

### `server.js` (root, Plesk "Application startup file")

```js
import "./dist/server/index.mjs";
```

### `package.json` scripts

```json
"start": "node server.js",
"preview": "node server.js",
```

### `.gitignore`

`dist` removed, and the server dependencies Nitro copies next to the build re-included:

```gitignore
node_modules
# dist is committed: Plesk deploys the built app straight from Git (npm run build before each push).
# Keep the server dependencies Nitro copies next to the build.
!dist/server/node_modules/
```

### `.gitattributes`

```gitattributes
# The build output is served with the file sizes recorded at build time (Content-Length),
# so Git must never convert its line endings on checkout.
dist/** -text
```

## Lessons learned (verified)

- Nitro v3 treats a root `server.js` as **its own** server entry → the build failed until
  `serverEntry: false` was set.
- The `node_modules` rule in `.gitignore` also hides `dist/server/node_modules` (traced server
  dependencies) → it had to be re-included.
- The Node server sends the **build-time file sizes** as `Content-Length`: a checkout that converts
  LF → CRLF (Git for Windows, `core.autocrlf=true`) serves truncated JS/CSS → `.gitattributes` fix.
- The built server (`dist/server` + `dist/client`) runs without `node_modules` and from any working
  directory; it also loads through `require()` (Passenger style) on Node ≥ 22.12.
- Plesk settings that were planned: startup file `server.js`, document root `dist/client`,
  Node ≥ 22.12, no "NPM install" needed.

## Deployment notes (still valid for Vercel)

- **Environment variables (Vercel → Settings → Environment Variables):**
  - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — read **at build time** (built into the code).
    Without them the site has no Supabase connection. Redeploy after any change.
  - `SUPABASE_SERVICE_ROLE_KEY` — read at runtime, server only (client account creation).
    Mark it _Sensitive_; never prefix it with `VITE_`.
  - `SUPABASE_URL` — optional, the server falls back to `VITE_SUPABASE_URL`.
- **Supabase → Auth → URL Configuration:** Site URL + Redirect URLs must include the production
  domain (and the `*.vercel.app` URLs), otherwise sign-up / password-reset links don't come back.
- **Supabase Edge Function secrets** (berth booking email): `EMAIL_PROVIDER_API_KEY` or
  `RESEND_API_KEY`, `EMAIL_FROM`, `CAPITAINERIE_EMAIL`.
- **Node.js:** 22.x or 24.x in the Vercel project settings.
- **On 2026-10-12 the live Vercel site was still serving `7e3679e`:** the pushes of `9f39d6d` and
  `bbaee28` were not deployed. Check Vercel → Deployments (Git integration connected? failed builds?).
- **Domains:**
  - `marinamonastir.com` — DNS at **GoDaddy** (`ns55/ns56.domaincontrol.com`), no records yet.
    For Vercel: `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`
    (or the exact values shown on Vercel's Domains page).
  - `marinamonastir.tn` — **Topnet** DNS, serves the client's old PHP site (Plesk) and the
    `@marinamonastir.tn` email (MX `mx1–3.topnet.tn`). Don't change its MX records.
