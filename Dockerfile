# Multi-stage build for optimized production image
# Stage 1: Build the React application
FROM oven/bun:latest as builder

WORKDIR /app

COPY package.json bun.lockb ./
# Allow bun to update the lockfile during image build if needed
RUN bun install

COPY . .
RUN bun run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Install envsubst (provided by gettext) for runtime substitution of PORT
RUN apk add --no-cache gettext

# Copy the build output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx template and entrypoint that substitutes $PORT at container start
COPY nginx.conf.template /nginx.conf.template
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]