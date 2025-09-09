# Changelog

All notable changes to the J2IT website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-01-03

### Added

- Complete website redesign with dark theme and modern animations
- Navigation component with fixed header and mobile menu
- Hero section with gradient background and CTAs
- Profile introduction with animated ring effect
- "What You Get" features section with animated gradient borders
- "How It Works" process cards with step-by-step guide
- Form validation using Valibot
- Input sanitization with DOMPurify
- JWT-authenticated webhook endpoint for N8n integration
- Rate limiting for form submissions (10 requests/minute per IP)
- Smooth page transitions using `onNavigate` hook
- IT Health Check lead generation form
- Contact form with secure processing
- Services detail page
- Insights/blog page (ready for Directus integration)
- Thank you confirmation pages
- Environment variables for webhook configuration
- Responsive design for all screen sizes

### Changed

- Migrated from light theme to dark theme (#0f0f1a background)
- Updated layout structure with new navigation system
- Replaced old Header, Services, and Contact components
- Improved typography with Inter font family
- Enhanced security with form validation and sanitization

### Security

- Added JWT authentication for webhook endpoints
- Implemented rate limiting to prevent abuse
- Added input sanitization with DOMPurify
- Integrated Valibot for schema validation
- Protected forms with CSRF tokens (SvelteKit built-in)

### Dependencies

- Added `valibot` for form validation
- Added `isomorphic-dompurify` for XSS protection
- Added `jsonwebtoken` for JWT authentication
- Added development types for TypeScript support

## [1.0.0] - Previous Version

### Features

- Basic SvelteKit website
- Simple contact form with iframe
- Service listing
- Responsive layout with Tailwind CSS
