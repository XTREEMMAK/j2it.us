# Changelog

All notable changes to the J2IT website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-09-17

### Removed

- **File Cleanup**: Deleted outdated `j2it_website_redesign/` directory (1.16 MB)
  - Removed design mockups and planning documents no longer needed
  - Cleaned up development artifacts from initial project phase

### Changed

- **Documentation Updates**: Enhanced project documentation
  - Updated CHANGELOG.md with detailed CSS refactoring achievements
  - Improved README.md with performance optimization details
  - Added development guidelines for CSS consolidation approach

### Fixed

- **Code Quality**: All files now properly formatted with Prettier
  - Ensured consistent code styling across entire codebase
  - Verified all linting and formatting standards are met

## [1.0.0] - 2025-01-09

### Added

- **SEO Enhancements**
  - Canonical URL tag for proper page indexing
  - Enhanced Local Business schema markup with comprehensive fields (geo coordinates, opening hours, services, etc.)
- **Code Quality & DevOps**
  - Prettier code formatting with automated linting
  - GitHub Actions workflow with build verification
  - Version tracking starting at 1.0.0
- **Form Improvements**
  - Separate webhook URLs for contact and health-check forms
  - Fixed optional field validation in health-check form
  - Proper handling of dropdown values in number of computers field

### Changed

- Updated ProfileIntro paragraph text sizing to match HeroSection (text-xl sm:text-2xl)
- Improved form validation schemas with proper empty field handling
- Enhanced error message display in forms

### Fixed

- Health check form validation now accepts actual dropdown values (1-3, 4-6, etc.)
- Optional form fields properly allow empty submissions
- Resolved "Please enter a valid number" error for computer count dropdown
- **CSS Media Query Issue**: Fixed broken homepage layout by replacing CSS custom properties with hardcoded values in media queries (CSS variables don't work in media query conditions)

### Refactored

- **Environment Variable System**
  - Created dynamic structured data system using environment variables
  - Added 21 new environment variables for complete business data configuration
  - Built `structuredData.js` utility to generate LocalBusiness schema from env vars
  - Refactored `+layout.svelte` to use dynamic data instead of hardcoded values
- **GitHub Actions Optimization**
  - Created `.env.production.template` with placeholder system
  - Streamlined deployment workflow using template substitution
  - Reduced main.yml heredoc complexity by 90%
  - Balanced approach: secrets for location/contact data, hardcoded for static info

- **Code Quality Improvements**
  - **CSS Consolidation**: Achieved 82-line code reduction (38% reduction in affected files)
  - **Animation Deduplication**: Removed 5 duplicate animations (`gradient-rotate`, `pulse-glow`, `spin`, `fade-in`, `fade-out`)
  - **Design Token Centralization**: Added 22 centralized CSS custom properties in `app.css`
  - **Utility Class Consolidation**: Created shared `.bg-gradient-radial` utility class
  - Created shared utilities (Spinner, throttle, formHandler)
  - Optimized mouse tracking with throttling for 60fps performance

## [0.9.0] - 2025-01-03

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
