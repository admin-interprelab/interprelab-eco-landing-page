#!/bin/bash
# Deploy all InterpreLab microservices to Google Cloud Run

set -e

REGION="us-central1"
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)

echo "========================================"
echo "  InterpreLab Services Deployment"
echo "========================================"
echo ""
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Check if gcloud is configured
if [ -z "$PROJECT_ID" ]; then
    echo "Error: No GCP project configured"
    echo "Run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

# Services to deploy (in order)
SERVICES=("auth" "interpreTest" "interprestudy" "interpreCoach" "interpretrack" "interpreLink/interprehub")

echo "Will deploy ${#SERVICES[@]} services:"
for service in "${SERVICES[@]}"; do
    echo "  - $service"
done
echo ""

read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled"
    exit 0
fi

# Deploy each service
for service in "${SERVICES[@]}"; do
    echo ""
    echo "========================================"
    echo "  Deploying: $service"
    echo "========================================"
    echo ""
    
    cd "services/$service"
    
    if [ "$service" == "auth" ]; then
        echo "Deploying Auth Service..."
        gcloud run deploy "${service}-service" \
            --source . \
            --platform managed \
            --region $REGION \
            --allow-unauthenticated \
            --memory 512Mi \
            --cpu 1 \
            --timeout 60
    else
        gcloud run deploy "$(basename $service)-service" \
            --source . \
            --platform managed \
            --region $REGION \
            --allow-unauthenticated \
            --memory 512Mi \
            --cpu 1 \
            --timeout 30
    fi
    
    echo "✓ $service deployed successfully"
    cd ../..
done

echo ""
echo "========================================"
echo "  Deployment Complete!"
echo "========================================"
echo ""
echo "View all services:"
echo "  gcloud run services list --region $REGION"
echo ""
