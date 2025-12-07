#!/bin/bash

# InterpreLab Cloud Run Deployment Script
# This script simplifies the deployment process to Google Cloud Run

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}InterpreLab Cloud Run Deployment${NC}"
echo "=================================="

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: gcloud CLI is not installed${NC}"
    echo "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Get project ID
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)

if [ -z "$PROJECT_ID" ]; then
    echo -e "${YELLOW}No project set. Please enter your Google Cloud Project ID:${NC}"
    read -r PROJECT_ID
    gcloud config set project "$PROJECT_ID"
fi

echo -e "${GREEN}Using project: $PROJECT_ID${NC}"

# Service name
SERVICE_NAME="interprelab"
REGION="us-central1"

# Ask for deployment method
echo ""
echo "Select deployment method:"
echo "1) Quick deploy (build and deploy from source)"
echo "2) Deploy with custom settings"
echo "3) Local Docker build and push"
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        echo -e "${GREEN}Deploying from source...${NC}"
        gcloud run deploy $SERVICE_NAME \
            --source . \
            --platform managed \
            --region $REGION \
            --allow-unauthenticated \
            --port 8080 \
            --memory 512Mi \
            --cpu 1 \
            --min-instances 0 \
            --max-instances 10
        ;;
    2)
        echo -e "${YELLOW}Custom deployment settings:${NC}"
        read -p "Memory (default: 512Mi): " MEMORY
        MEMORY=${MEMORY:-512Mi}
        
        read -p "CPU (default: 1): " CPU
        CPU=${CPU:-1}
        
        read -p "Min instances (default: 0): " MIN_INST
        MIN_INST=${MIN_INST:-0}
        
        read -p "Max instances (default: 10): " MAX_INST
        MAX_INST=${MAX_INST:-10}
        
        echo -e "${GREEN}Deploying with custom settings...${NC}"
        gcloud run deploy $SERVICE_NAME \
            --source . \
            --platform managed \
            --region $REGION \
            --allow-unauthenticated \
            --port 8080 \
            --memory $MEMORY \
            --cpu $CPU \
            --min-instances $MIN_INST \
            --max-instances $MAX_INST
        ;;
    3)
        echo -e "${GREEN}Building Docker image locally...${NC}"
        IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME:latest"
        
        docker build -t $IMAGE_NAME .
        
        echo -e "${GREEN}Pushing to Container Registry...${NC}"
        docker push $IMAGE_NAME
        
        echo -e "${GREEN}Deploying to Cloud Run...${NC}"
        gcloud run deploy $SERVICE_NAME \
            --image $IMAGE_NAME \
            --platform managed \
            --region $REGION \
            --allow-unauthenticated \
            --port 8080 \
            --memory 512Mi \
            --cpu 1
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)')

echo ""
echo -e "${GREEN}Deployment successful!${NC}"
echo -e "Service URL: ${YELLOW}$SERVICE_URL${NC}"
echo ""
echo "To view logs:"
echo "  gcloud run services logs read $SERVICE_NAME --region $REGION"
echo ""
echo "To update environment variables:"
echo "  gcloud run services update $SERVICE_NAME --set-env-vars KEY=VALUE"
