# J²IT: IT and Web Solutions

The official website for J²IT, providing affordable IT support and web solutions for small businesses in Florida.

## 🚀 Version 1.0.1

This codebase has been optimized for performance, maintainability, and SEO. See [CHANGELOG.md](./CHANGELOG.md) for detailed release notes.

## 🛠 Technology Stack

- **Framework**: SvelteKit with Svelte 5
- **Styling**: Tailwind CSS v4 with custom design system
- **Build Tool**: Vite
- **Deployment**: Docker with GitHub Container Registry (ghcr.io)
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
└── .env.production.template # Template for GitHub Actions environment setup
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

Required environment variables (see `.env.example`):

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

### GitHub Actions CI/CD

Automated deployment on push to `main`:

1. Build Docker image with all environment variables as build args
2. Push to GitHub Container Registry (`ghcr.io/xtreemmak/j2it.us`)
3. SSH to production server
4. Pull latest image and restart container

**Required GitHub Secrets:**

- `SERVER_IP`, `SERVER_USERNAME`, `SERVER_DIRECTORY`, `APP_PORT`
- `SSH_PRIVATE_KEY`
- `PUBLIC_CDN_URL`, `WEBHOOK_JWT_SECRET`
- `N8N_CONTACT_WEBHOOK_URL`, `N8N_HEALTH_CHECK_WEBHOOK_URL`
- `PUBLIC_TAWK_PROPERTY_ID`, `PUBLIC_TAWK_WIDGET_ID`
- `GOOGLE_PLACES_API_KEY`, `GOOGLE_BUSINESS_PLACE_ID`
- `PUBLIC_BUSINESS_PHONE`, `PUBLIC_BUSINESS_STREET`, `PUBLIC_BUSINESS_CITY`
- `PUBLIC_BUSINESS_STATE`, `PUBLIC_BUSINESS_ZIP`, `PUBLIC_BUSINESS_COUNTRY`
- `PUBLIC_BUSINESS_LATITUDE`, `PUBLIC_BUSINESS_LONGITUDE`

### Docker Files

- `Dockerfile` - Multi-stage production build
- `docker-compose.yml` - Local development with hot reload
- `docker-compose.prod.yml` - Production configuration
- `.dockerignore` - Excludes unnecessary files from build

### Manual Deployment

```bash
# Build and run locally (production mode)
docker compose -f docker-compose.prod.yml up -d

# Sync static assets to CDN
./deploy.sh
```

### Server Requirements

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Log out and back in, then verify
docker ps
```

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
