#!/bin/sh
# Docker entrypoint script for InterpreLab application

set -e

# Function to log messages
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting InterpreLab application container..."

# Check if we're running as root and switch to nginx user
if [ "$(id -u)" = "0" ]; then
    log "Running as root, switching to nginx user..."
    exec su-exec nginx "$0" "$@"
fi

# Validate required environment variables
if [ -z "$VITE_SUPABASE_URL" ]; then
    log "WARNING: VITE_SUPABASE_URL not set"
fi

if [ -z "$VITE_SUPABASE_PUBLISHABLE_KEY" ]; then
    log "WARNING: VITE_SUPABASE_PUBLISHABLE_KEY not set"
fi

# Create necessary directories
mkdir -p /tmp/nginx/client_temp
mkdir -p /tmp/nginx/proxy_temp
mkdir -p /tmp/nginx/fastcgi_temp
mkdir -p /tmp/nginx/uwsgi_temp
mkdir -p /tmp/nginx/scgi_temp

# Set proper permissions
chmod -R 755 /tmp/nginx

# Test nginx configuration
log "Testing nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    log "Nginx configuration is valid"
else
    log "ERROR: Nginx configuration is invalid"
    exit 1
fi

# Log container information
log "Container started successfully"
log "Server name: interprelab.com, app.interprelab.com"
log "Port: 8080"
log "Health check: /health"

# Execute the main command
exec "$@"
