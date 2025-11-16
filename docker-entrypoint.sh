#!/bin/sh
set -eu

# Ensure PORT is set (Cloud Run provides PORT); default to 8080 if unset
PORT=${PORT:-8080}
export PORT

# Substitute the PORT into nginx config and start nginx in foreground
if [ -f /nginx.conf.template ]; then
  envsubst '$PORT' < /nginx.conf.template > /etc/nginx/nginx.conf
fi

exec nginx -g 'daemon off;'
