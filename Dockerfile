# ============================================
# j2it.com — platform-agnostic production image
#
# This image contains NO configuration and NO secrets. Every value the app
# needs is read from the environment at container start via SvelteKit's
# $env/dynamic/* , so the same image digest can be promoted across any
# environment (internal infra, DigitalOcean, local) without a rebuild.
#
# See .env.docker.example for the full runtime environment contract.
# ============================================

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:22-alpine AS deps

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# ============================================
# Stage 2: Builder
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# No build args: configuration is resolved at runtime, not baked in here.
RUN npm run build

# ============================================
# Stage 3: Production Runner
# ============================================
FROM node:22-alpine AS runner

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 sveltekit

# Copy package files and install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Set ownership
RUN chown -R sveltekit:nodejs /app

# Switch to non-root user
USER sveltekit

# Runtime defaults — override any of these (and all app config) at `docker run`
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

# Expose the port
EXPOSE 3000

# Health check — honours a remapped PORT
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider "http://127.0.0.1:${PORT}/" || exit 1

# Start the application
CMD ["node", "build/index.js"]
