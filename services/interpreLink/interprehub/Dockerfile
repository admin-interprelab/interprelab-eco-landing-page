# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace files
COPY package*.json ./
COPY services/interprebot/package*.json ./services/interprebot/
COPY packages/ui/ ./packages/ui/

# Install dependencies
RUN npm ci

# Copy interprebot source
COPY services/interprebot/ ./services/interprebot/

# Build the service
WORKDIR /app/services/interprebot
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/services/interprebot/dist /usr/share/nginx/html/interprebot

# Copy nginx config
COPY services/interprebot/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/interprebot || exit 1

CMD ["nginx", "-g", "daemon off;"]
