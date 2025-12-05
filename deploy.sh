#!/bin/bash

# InterpreLab Docker Deployment Script
# This script builds and deploys the InterpreLab application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="interprelab/app"
CONTAINER_NAME="interprelab-app"
REGISTRY="ghcr.io/admin-interprelab"
VERSION=${1:-latest}

# Functions
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        error "Docker is not running. Please start Docker and try again."
    fi
    success "Docker is running"
}

# Check if required environment variables are set
check_env() {
    log "Checking environment variables..."

    if [ -z "$VITE_SUPABASE_URL" ]; then
        warning "VITE_SUPABASE_URL is not set"
    fi

    if [ -z "$VITE_SUPABASE_PUBLISHABLE_KEY" ]; then
        warning "VITE_SUPABASE_PUBLISHABLE_KEY is not set"
    fi

    success "Environment variables checked"
}

# Build the Docker image
build_image() {
    log "Building Docker image: ${IMAGE_NAME}:${VERSION}"

    docker build \
        --target production \
        --tag ${IMAGE_NAME}:${VERSION} \
        --tag ${IMAGE_NAME}:latest \
        --build-arg NODE_ENV=production \
        .

    success "Docker image built successfully"
}

# Stop and remove existing container
cleanup_container() {
    log "Cleaning up existing containers..."

    if docker ps -a --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        log "Stopping existing container: ${CONTAINER_NAME}"
        docker stop ${CONTAINER_NAME} || true

        log "Removing existing container: ${CONTAINER_NAME}"
        docker rm ${CONTAINER_NAME} || true
    fi

    success "Container cleanup completed"
}

# Run the new container
run_container() {
    log "Starting new container: ${CONTAINER_NAME}"

    docker run -d \
        --name ${CONTAINER_NAME} \
        --restart unless-stopped \
        -p 8080:8080 \
        -e NODE_ENV=production \
        -e VITE_SUPABASE_URL="${VITE_SUPABASE_URL}" \
        -e VITE_SUPABASE_PUBLISHABLE_KEY="${VITE_SUPABASE_PUBLISHABLE_KEY}" \
        -e VITE_SUPABASE_PROJECT_ID="${VITE_SUPABASE_PROJECT_ID}" \
        -e VITE_GOOGLE_API_KEY="${VITE_GOOGLE_API_KEY}" \
        ${IMAGE_NAME}:${VERSION}

    success "Container started successfully"
}

# Check container health
check_health() {
    log "Checking container health..."

    # Wait for container to start
    sleep 10

    # Check if container is running
    if ! docker ps --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        error "Container is not running"
    fi

    # Check health endpoint
    local max_attempts=30
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        if curl -f http://localhost:8080/health > /dev/null 2>&1; then
            success "Health check passed"
            return 0
        fi

        log "Health check attempt ${attempt}/${max_attempts} failed, retrying..."
        sleep 2
        ((attempt++))
    done

    error "Health check failed after ${max_attempts} attempts"
}

# Push to registry (optional)
push_image() {
    if [ "$2" = "--push" ]; then
        log "Pushing image to registry: ${REGISTRY}/${IMAGE_NAME}:${VERSION}"

        docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:${VERSION}
        docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:latest

        docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION}
        docker push ${REGISTRY}/${IMAGE_NAME}:latest

        success "Image pushed to registry"
    fi
}

# Show container logs
show_logs() {
    log "Container logs (last 50 lines):"
    docker logs --tail 50 ${CONTAINER_NAME}
}

# Main deployment function
deploy() {
    log "Starting InterpreLab deployment..."

    check_docker
    check_env
    build_image
    cleanup_container
    run_container
    check_health
    push_image "$@"
    show_logs

    success "Deployment completed successfully!"
    log "Application is running at:"
    log "  - http://localhost:8080"
    log "  - Health check: http://localhost:8080/health"
    log ""
    log "To view logs: docker logs -f ${CONTAINER_NAME}"
    log "To stop: docker stop ${CONTAINER_NAME}"
}

# Script usage
usage() {
    echo "Usage: $0 [VERSION] [--push]"
    echo ""
    echo "Arguments:"
    echo "  VERSION    Docker image version (default: latest)"
    echo "  --push     Push image to registry after build"
    echo ""
    echo "Examples:"
    echo "  $0                    # Deploy with latest tag"
    echo "  $0 v1.0.0             # Deploy with specific version"
    echo "  $0 latest --push      # Deploy and push to registry"
    echo ""
    echo "Environment variables required:"
    echo "  VITE_SUPABASE_URL"
    echo "  VITE_SUPABASE_PUBLISHABLE_KEY"
    echo "  VITE_SUPABASE_PROJECT_ID"
    echo "  VITE_GOOGLE_API_KEY"
}

# Handle script arguments
case "$1" in
    -h|--help)
        usage
        exit 0
        ;;
    *)
        deploy "$@"
        ;;
esac
