#!/bin/sh
# Docker entrypoint script for InterpreLab application

# Function to log messages
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting InterpreLab application container..."

# Set PORT environment variable (default to 8080 for local, Cloud Run will override)
export PORT=${PORT:-8080}
log "Using PORT: $PORT"

# Validate required environment variables
if [ -z "$VITE_SUPABASE_URL" ]; then
    log "WARNING: VITE_SUPABASE_URL not set"
fi

if [ -z "$VITE_SUPABASE_PUBLISHABLE_KEY" ]; then
    log "WARNING: VITE_SUPABASE_PUBLISHABLE_KEY not set"
fi

# Create necessary directories for nginx temp files
mkdir -p /tmp/nginx/client_temp /tmp/nginx/proxy_temp /tmp/nginx/fastcgi_temp /tmp/nginx/uwsgi_temp /tmp/nginx/scgi_temp
chmod -R 777 /tmp/nginx

# Substitute environment variables in nginx configuration
envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Test nginx configuration
log "Testing nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    log "Nginx configuration is valid"
else
    log "ERROR: Nginx configuration is invalid. Dumping config:"
    cat /etc/nginx/nginx.conf
    exit 1
fi

# Log container information
log "Container started successfully"
log "Server name: interprelab.com, app.interprelab.com"
log "Port: $PORT"
log "Health check: /health"

# Execute the main command (nginx)
log "Starting nginx..."
exec "$@"
