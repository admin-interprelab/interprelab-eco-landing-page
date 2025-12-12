# Multi-stage build for optimized InterpreLab production deployment
# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies with clean cache
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code
COPY . .
RUN bun run build

# Build the application for production
RUN npm run build

# Stage 2: Production image with nginx
FROM nginx:1.25-alpine AS production

# Install necessary packages for health checks and SSL
RUN apk add --no-cache \
    curl \
    openssl \
    ca-certificates

# Create nginx user directories with proper permissions
RUN mkdir -p /var/cache/nginx /var/log/nginx /tmp/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx /tmp/nginx && \
    chmod -R 755 /var/cache/nginx /var/log/nginx /tmp/nginx

# Copy custom nginx configuration for InterpreLab domains
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy additional configuration files
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Create robots.txt for SEO
RUN echo -e "User-agent: *\nAllow: /\nSitemap: https://interprelab.com/sitemap.xml" > /usr/share/nginx/html/robots.txt

# Switch to non-root user for security
USER nginx

# Expose port 8080 (Cloud Run standard)
EXPOSE 8080

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Use custom entrypoint for environment variable injection
ENTRYPOINT ["/docker-entrypoint.sh"]

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
