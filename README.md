# J²IT: IT and Web Solutions

The official website for J²IT, providing affordable IT support and web solutions for small businesses in Florida.

## 🚀 Version 1.0.1

This codebase has been optimized for performance, maintainability, and SEO. See [CHANGELOG.md](./CHANGELOG.md) for detailed release notes.

## 🛠 Technology Stack

- **Framework**: SvelteKit with Svelte 5
- **Styling**: Tailwind CSS v4 with custom design system
- **Build Tool**: Vite
- **Deployment**: Node.js adapter for server-side rendering
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

- Node.js 22+
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd j2it.com

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### Development

```bash
# Start development server
npm run dev

# Open in browser
npm run dev -- --open

# Run linting
npm run lint

# Format code
npm run format
```

### Production Build

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

### GitHub Actions

The project includes automated deployment via GitHub Actions:

1. Linting and build verification
2. Template-based environment variable setup using `.env.production.template`
3. Asset deployment to DigitalOcean Spaces
4. PM2 process management on server

**Required GitHub Secrets (Location/Contact Data):**

- `PUBLIC_BUSINESS_PHONE`, `PUBLIC_BUSINESS_STREET`, `PUBLIC_BUSINESS_CITY`
- `PUBLIC_BUSINESS_STATE`, `PUBLIC_BUSINESS_ZIP`, `PUBLIC_BUSINESS_COUNTRY`
- `PUBLIC_BUSINESS_LATITUDE`, `PUBLIC_BUSINESS_LONGITUDE`
- Standard secrets: `SERVER_IP`, `SERVER_USERNAME`, `WEBHOOK_JWT_SECRET`, etc.

**Hardcoded in Workflow (Static Business Info):**

- Business name, founder info, hours, email, and other static data

### Manual Deployment

```bash
# Build and deploy
./deploy.sh
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
