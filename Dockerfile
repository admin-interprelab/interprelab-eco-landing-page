# Multi-stage build for optimized InterpreLab production deployment
# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install && \
    npm cache clean --force

# Copy source code
COPY . .

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
    chmod -R 755 /var/cache/nginx /var/log/nginx /tmp/nginx && \
    touch /tmp/nginx.pid && \
    chown nginx:nginx /tmp/nginx.pid

# Copy custom nginx configuration for InterpreLab domains
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# No additional configuration files needed

# Create robots.txt for SEO
RUN echo -e "User-agent: *\nAllow: /\nSitemap: https://interprelab.com/sitemap.xml" > /usr/share/nginx/html/robots.txt

# Expose port 80 (Cloud Run standard)
EXPOSE 80

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/health || exit 1

# Start nginx directly
CMD ["sh", "-c", "mkdir -p /tmp/nginx/client_temp /tmp/nginx/proxy_temp /tmp/nginx/fastcgi_temp /tmp/nginx/uwsgi_temp /tmp/nginx/scgi_temp && chmod -R 755 /tmp/nginx && touch /tmp/nginx.pid && chmod 644 /tmp/nginx.pid && nginx -t && nginx -g 'daemon off;'"]
