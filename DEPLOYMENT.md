# Deployment Guide

This guide covers how to deploy the Open Mool monorepo. The project consists of two main applications:
- **API**: A Cloudflare Worker (`apps/api`)
- **Web**: A Next.js application (`apps/web`)

## Prerequisites

- **Node.js**: v18 or later.
- **pnpm**: `npm install -g pnpm`
- **Cloudflare Account**: For deploying the API.
- **Vercel Account**: For deploying the frontend (recommended).

---

## 1. Deploying the API (Cloudflare Workers)

The API is built using Hono and runs on Cloudflare Workers.

### Step 1: Login to Cloudflare
Authenticate Wrangler with your Cloudflare account:
```bash
npx wrangler login
```

### Step 2: Configure `wrangler.toml`
Ensure `apps/api/wrangler.toml` has the correct configuration. You may need to update the `name` or add KV/D1 namespace bindings if your project uses them later.

### Step 3: Deploy
Run the deployment command from the `apps/api` directory:

```bash
cd apps/api
pnpm run deploy
```
*Or from the root:*
```bash
pnpm --filter api run deploy
```

Once deployed, Cloudflare will return your worker's URL (e.g., `https://open-mool-api.open-mool.workers.dev`).

### Step 4: Add Secrets (Optional)
If your API requires environment variables (like Database URLs or API keys), set them using `wrangler secret`:

```bash
cd apps/api
npx wrangler secret put DATABASE_URL
```

---

## 2. Deploying the Web App (Vercel)

The frontend is a standard Next.js application, making Vercel the seamless deployment choice.

### Step 1: Push to GitHub/GitLab
Ensure your latest code is pushed to your remote repository.

### Step 2: Import into Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Import your `open-mool` repository.

### Step 3: Configure Build Settings
Vercel usually auto-detects monorepos, but confirm the settings:
- **Framework Preset**: Next.js
- **Root Directory**: `apps/web` (Important: Select the web app folder, not the root)

### Step 4: Environment Variables
Add any necessary environment variables in the Vercel dashboard. You likely need to connect the Frontend to your deployed API:
- `NEXT_PUBLIC_API_URL`: The URL of your deployed Cloudflare Worker (from Section 1).

### Step 5: Deploy
Click **Deploy**. Vercel will build and host your application.

---

## Alternative: Deploying Web App to Cloudflare Pages

If you prefer to keep everything on Cloudflare:

### Cloudflare Pages Setup
1. Go to **Cloudflare Dashboard** > **Pages**
2. Click **"Create a project"** > **"Connect to Git"**
3. Select your `open-mool` repository
4. Configure build settings:
   - **Production branch**: `master` (or `main`)
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `pnpm run build`
   - **Build output directory**: `out`
   - **Root directory**: `apps/web`
5. Click **"Save and Deploy"**

### Important Notes
- The app is configured for static export (`output: 'export'` in `next.config.mjs`)
- This means no server-side rendering or API routes - purely static HTML/CSS/JS
- For SSR support on Cloudflare Pages, use `@cloudflare/next-on-pages` instead
