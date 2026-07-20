# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- `npm run dev` - Start development server on default port (5173)
- `npm run dev -- --open` - Start dev server and open in browser
- `npm run build` - Build for production (uses Node adapter)
- `npm run preview` - Preview production build locally
- `npm install` - Install dependencies

### Deployment

- Pushing to `main` triggers `.github/workflows/build-image.yml`, which builds a
  configuration-free Docker image and pushes it to `ghcr.io/xtreemmak/j2it.us`.
  The workflow does **not** deploy — internal infra (Semaphore) pulls a tag and
  runs it.
- `./deploy.sh` - Syncs static assets to the DigitalOcean Spaces CDN only.
  Requires `.env.production` (see `.env.production.template`).
- `.env.docker.example` - The runtime environment contract for the container.

## Architecture Overview

This is a **SvelteKit** application with server-side rendering, configured for Node.js deployment:

### Technology Stack

- **Framework**: SvelteKit with Svelte 5
- **Styling**: Tailwind CSS v4 (configured via Vite plugin)
- **Build Tool**: Vite
- **Adapter**: Node adapter (not auto-adapter) for production deployment
- **Font**: Inter (loaded from Google Fonts)
- **Special Features**: Canvas confetti for celebrations

### Key Architecture Decisions

1. **Node Adapter Configuration**: The project uses `@sveltejs/adapter-node` instead of the default auto-adapter, configured in `svelte.config.js:2`

2. **Environment Variables — runtime only**: All config is read through
   `$env/dynamic/public` and `$env/dynamic/private`, never `$env/static/*`.
   This keeps the Docker image portable and secret-free; the same image runs in
   any environment. **Do not introduce `$env/static/*` imports or `define:`
   entries in `vite.config.js`** — both bake values into the bundle at build
   time and would break this.
   - `PUBLIC_CDN_URL` - Used for loading images and assets from CDN
   - Referenced in layouts for Open Graph images and structured data
   - Nothing is prerendered, so dynamic env is safe on every route

3. **Routing Structure**:
   - Main layout (`src/routes/+layout.svelte`) handles:
     - Global CSS imports (reset.css, app.css)
     - SEO meta tags and Open Graph data
     - Structured data for local business schema
     - Footer component inclusion
   - Homepage (`src/routes/+page.svelte`) composes Header, Services, and Contact sections
   - Congratulations page (`src/routes/congrats/+page.svelte`) for contact form success

4. **Component Organization**:
   - Layout components in `src/lib/components/layout/`:
     - `Header.svelte` - Site header
     - `Services.svelte` - Services section
     - `Contact.svelte` - Contact form
     - `Footer.svelte` - Site footer
   - Components use Svelte 5 runes syntax

5. **Static Assets & CDN**:
   - Local static files in `/static/` directory
   - Images optimized as WebP format
   - Production deployment syncs static assets to DigitalOcean Spaces CDN
   - CDN URLs are used in production for better performance

6. **Styling Approach**:
   - Tailwind CSS v4 integrated via Vite plugin
   - Custom reset.css for baseline styles
   - app.css for global application styles
   - Tailwind Forms plugin for form styling

## Important Context

- This is the official website for J2IT.us, a small business IT and web solutions company
- The site includes business information with structured data for SEO
- Contact form submissions redirect to a congratulations page with confetti animation
- Production deployment involves both GitHub (for code) and DigitalOcean Spaces (for static assets)
