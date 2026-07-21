# J²IT: IT and Web Solutions

The official website for J²IT, providing affordable IT support and web solutions for small businesses in Florida.

## 🚀 Version 1.0.1

This codebase has been optimized for performance, maintainability, and SEO. See [CHANGELOG.md](./CHANGELOG.md) for detailed release notes.

## 🛠 Technology Stack

- **Framework**: SvelteKit with Svelte 5
- **Styling**: Tailwind CSS v4 with custom design system
- **Build Tool**: Vite
- **Deployment**: Configuration-free Docker image on GitHub Container Registry (ghcr.io), deployed by internal infra
- **Font**: Inter (Google Fonts)
- **Validation**: Valibot for form schemas
- **Security**: JWT authentication, rate limiting, input sanitization

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── forms/           # Contact and health-check forms
│   │   ├── layout/          # Navigation, hero, sections
│   │   └── ui/              # Reusable UI components (Spinner)
│   ├── schemas/             # Valibot validation schemas
│   ├── server/              # Server-side utilities (webhook, auth)
│   ├── stores/              # Svelte stores (features, scroll)
│   └── utils/               # Shared utilities (throttle, animations, structuredData)
├── routes/                  # SvelteKit routes and pages
├── static/                  # Static assets
└── .env.docker.example      # Runtime environment contract for the container
```

## 🏁 Quick Start

### Prerequisites

- Node.js 22+ (for local development without Docker)
- Docker and Docker Compose (recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd j2it.com

# Copy environment template
cp .env.example .env
```

### Development with Docker (Recommended)

```bash
# Start development server with hot reload
docker compose up

# Or run in background
docker compose up -d

# View logs
docker compose logs -f
```

### Development without Docker

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
npm run dev -- --open
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

### Production Build (Local)

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Configuration

All configuration is resolved **at runtime**, never at build time. Nothing below
is compiled into the bundle, so changing any of it means restarting the
container — not rebuilding the image.

- Local development: `.env` (see `.env.example`)
- Containers: injected environment (see `.env.docker.example`)

**Core Application:**

- `PUBLIC_CDN_URL`: CDN endpoint for static assets
- `N8N_CONTACT_WEBHOOK_URL`: Webhook for contact form submissions
- `N8N_HEALTH_CHECK_WEBHOOK_URL`: Webhook for health-check form submissions
- `WEBHOOK_JWT_SECRET`: Secret for webhook authentication

**Business Schema.org Data:**

- `PUBLIC_BUSINESS_NAME`, `PUBLIC_BUSINESS_ALT_NAME`, `PUBLIC_BUSINESS_URL`
- `PUBLIC_BUSINESS_DESCRIPTION`, `PUBLIC_BUSINESS_PHONE`, `PUBLIC_BUSINESS_EMAIL`
- `PUBLIC_BUSINESS_PRICE_RANGE`, `PUBLIC_BUSINESS_STREET`, `PUBLIC_BUSINESS_CITY`
- `PUBLIC_BUSINESS_STATE`, `PUBLIC_BUSINESS_ZIP`, `PUBLIC_BUSINESS_COUNTRY`
- `PUBLIC_BUSINESS_LATITUDE`, `PUBLIC_BUSINESS_LONGITUDE`
- `PUBLIC_FOUNDER_NAME`, `PUBLIC_FOUNDER_TITLE`
- `PUBLIC_BUSINESS_AREA_SERVED`, `PUBLIC_BUSINESS_HOURS_DAYS`
- `PUBLIC_BUSINESS_HOURS_OPEN`, `PUBLIC_BUSINESS_HOURS_CLOSE`

**Bot protection (Cloudflare Turnstile):**

- `PUBLIC_TURNSTILE_SITE_KEY`: Public sitekey, renders the widget
- `TURNSTILE_SECRET_KEY`: Server-side verification key

Both forms are protected. If **either** key is unset, verification fails open
(submissions still go through) and a warning is logged — so an unconfigured
environment never silently drops leads. Set both to enforce the captcha.

**Optional:**

- Tawk.to chat widget configuration
- Rate limiting settings
- Feature toggles

## 🚀 Deployment

### Docker Architecture

The project uses a multi-stage Docker build for optimized production images:

- **Stage 1 (deps)**: Install all dependencies
- **Stage 2 (builder)**: Build the SvelteKit app with environment variables
- **Stage 3 (runner)**: Minimal production image with Node.js 22 Alpine

### Separation of concerns

**GitHub Actions builds. Internal infra (Semaphore) deploys.**

The published image is deliberately **configuration-free**: it contains no
secrets, no CDN URL, no business data. Every value is read from the environment
at container start via SvelteKit's `$env/dynamic/*`. That means one image digest
can be promoted to any platform — internal Docker, DigitalOcean, or local —
without a rebuild.

### GitHub Actions CI/CD

`.github/workflows/build-image.yml` runs on push to `main`, on `v*` tags, and on
manual dispatch:

1. Build the Docker image (no build args)
2. Push to GitHub Container Registry (`ghcr.io/xtreemmak/j2it.us`)
3. Print the image digest and tags to the workflow summary

The workflow never touches a server. Image tags produced:

| Tag             | When                     |
| --------------- | ------------------------ |
| `<commit-sha>`  | every build              |
| `latest`        | pushes to `main`         |
| `1.2.3` / `1.2` | pushes of a `v*` git tag |

**Required GitHub Secrets:** none beyond the automatic `GITHUB_TOKEN`.

### Deploying (infra)

Pull a published image and supply the environment at run time:

```bash
cp .env.docker.example .env      # fill in real values
IMAGE_TAG=<sha-or-version> docker compose -f docker-compose.prod.yml up -d
```

Prefer pinning an immutable `sha`/semver tag (or the digest printed in the
workflow summary) over `latest`.

`.env.docker.example` is the authoritative runtime environment contract — every
variable the container reads, with notes on which are required and which are
secrets.

### Docker Files

- `Dockerfile` - Multi-stage production build, no build args
- `docker-compose.yml` - Local development with hot reload
- `docker-compose.prod.yml` - Reference production manifest for infra
- `.env.docker.example` - Runtime environment contract
- `.dockerignore` - Excludes unnecessary files from build

### Static assets / CDN

`./deploy.sh` only syncs `./static/` to the DigitalOcean Spaces CDN that
`PUBLIC_CDN_URL` points at. It no longer deploys the application.

## 🎨 Key Features

### SEO Optimized

- Canonical URLs
- Enhanced Local Business schema markup (dynamically generated from environment variables)
- Open Graph and Twitter meta tags
- Structured data for search engines

### Performance Optimized

- **CSS Consolidation**: 82-line code reduction with centralized design tokens
- **Animation Optimization**: Eliminated duplicate animations, consolidated to app.css
- Throttled mouse tracking (60fps max)
- Optimized transitions with proper media query support
- Lazy loading and code splitting
- Efficient form validation

### Security Features

- Cloudflare Turnstile captcha on both forms, plus a honeypot field
- JWT authentication for webhooks
- Rate limiting (10 requests/minute per IP)
- Input sanitization with DOMPurify
- CSRF protection (SvelteKit built-in)

### Forms

- Contact form with validation
- IT Health Check lead generation form
- Real-time error handling
- Success page with confetti animation

## 🧪 Development Guidelines

### Code Style

- Prettier formatting enforced
- Consistent component patterns
- **Centralized CSS**: Design tokens and animations consolidated in `app.css`
- Shared utilities for common operations
- TypeScript-ready JSDoc comments

### Component Architecture

- Reusable UI components in `/ui/`
- Business logic separated from presentation
- Consistent prop patterns
- Shared validation schemas
- **Optimized CSS**: Eliminated duplicate animations and utility classes

### Performance Considerations

- **CSS Optimization**: 38% reduction in CSS code through deduplication
- **Responsive Design**: Proper media query implementation with hardcoded breakpoints
- Throttled event handlers
- Optimized animations with centralized definitions
- Minimal bundle size
- Server-side rendering

## 📚 Additional Documentation

- [CHANGELOG.md](./CHANGELOG.md) - Version history and release notes
- [CLAUDE.md](./CLAUDE.md) - Development commands and architecture notes
- Component documentation in respective files

## 🤝 Contributing

This is a private project for J²IT business. For internal development:

1. Create feature branches from `main`
2. Follow existing code patterns
3. Run linting and tests before committing
4. Update CHANGELOG.md for significant changes

## 📄 License

Private - All rights reserved by J²IT: IT and Web Solutions
