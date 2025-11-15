# Multi-stage build for optimized InterpreLab production deployment
# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Define build arguments
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY

# Set environment variables from build arguments
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev) needed for build
RUN npm ci && \
    npm cache clean --force

# Copy source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Production image with nginx
FROM nginx:1.25-alpine AS production

# Install necessary packages for health checks, SSL, and env substitution
RUN apk add --no-cache \
    curl \
    openssl \
    ca-certificates \
    gettext

# Create nginx user directories with proper permissions
RUN mkdir -p /var/cache/nginx /var/log/nginx /tmp/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx /tmp/nginx && \
    chmod -R 755 /var/cache/nginx /var/log/nginx /tmp/nginx

# Copy custom nginx configuration template
COPY optimized-features/nginx.conf /etc/nginx/nginx.conf.template

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Set ownership of the webroot
RUN chown -R nginx:nginx /usr/share/nginx/html

# Copy additional configuration files
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Create robots.txt for SEO
RUN echo -e "User-agent: *\nAllow: /\nSitemap: https://interprelab.com/sitemap.xml" > /usr/share/nginx/html/robots.txt

# Expose port 8080 (Cloud Run standard)
EXPOSE 8080

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT:-8080}/health || exit 1

# Use custom entrypoint for environment variable injection
ENTRYPOINT ["/docker-entrypoint.sh"]

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
