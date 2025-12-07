# InterpreLab Cloud Run Deployment Script (PowerShell)
# This script simplifies the deployment process to Google Cloud Run

$ErrorActionPreference = "Stop"

Write-Host "InterpreLab Cloud Run Deployment" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Check if gcloud is installed
if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Host "Error: gcloud CLI is not installed" -ForegroundColor Red
    Write-Host "Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

# Get project ID
$PROJECT_ID = gcloud config get-value project 2>$null

if ([string]::IsNullOrEmpty($PROJECT_ID)) {
    $PROJECT_ID = Read-Host "No project set. Please enter your Google Cloud Project ID"
    gcloud config set project $PROJECT_ID
}

Write-Host "Using project: $PROJECT_ID" -ForegroundColor Green

# Service name
$SERVICE_NAME = "interprelab"
$REGION = "us-central1"

# Ask for deployment method
Write-Host ""
Write-Host "Select deployment method:"
Write-Host "1) Quick deploy (build and deploy from source)"
Write-Host "2) Deploy with custom settings"
Write-Host "3) Local Docker build and push"
$choice = Read-Host "Enter choice [1-3]"

switch ($choice) {
    "1" {
        Write-Host "Deploying from source..." -ForegroundColor Green
        gcloud run deploy $SERVICE_NAME `
            --source . `
            --platform managed `
            --region $REGION `
            --allow-unauthenticated `
            --port 8080 `
            --memory 512Mi `
            --cpu 1 `
            --min-instances 0 `
            --max-instances 10
    }
    "2" {
        Write-Host "Custom deployment settings:" -ForegroundColor Yellow
        $MEMORY = Read-Host "Memory (default: 512Mi)"
        if ([string]::IsNullOrEmpty($MEMORY)) { $MEMORY = "512Mi" }
        
        $CPU = Read-Host "CPU (default: 1)"
        if ([string]::IsNullOrEmpty($CPU)) { $CPU = "1" }
        
        $MIN_INST = Read-Host "Min instances (default: 0)"
        if ([string]::IsNullOrEmpty($MIN_INST)) { $MIN_INST = "0" }
        
        $MAX_INST = Read-Host "Max instances (default: 10)"
        if ([string]::IsNullOrEmpty($MAX_INST)) { $MAX_INST = "10" }
        
        Write-Host "Deploying with custom settings..." -ForegroundColor Green
        gcloud run deploy $SERVICE_NAME `
            --source . `
            --platform managed `
            --region $REGION `
            --allow-unauthenticated `
            --port 8080 `
            --memory $MEMORY `
            --cpu $CPU `
            --min-instances $MIN_INST `
            --max-instances $MAX_INST
    }
    "3" {
        Write-Host "Building Docker image locally..." -ForegroundColor Green
        $IMAGE_NAME = "gcr.io/$PROJECT_ID/$SERVICE_NAME:latest"
        
        docker build -t $IMAGE_NAME .
        
        Write-Host "Pushing to Container Registry..." -ForegroundColor Green
        docker push $IMAGE_NAME
        
        Write-Host "Deploying to Cloud Run..." -ForegroundColor Green
        gcloud run deploy $SERVICE_NAME `
            --image $IMAGE_NAME `
            --platform managed `
            --region $REGION `
            --allow-unauthenticated `
            --port 8080 `
            --memory 512Mi `
            --cpu 1
    }
    default {
        Write-Host "Invalid choice" -ForegroundColor Red
        exit 1
    }
}

# Get the service URL
$SERVICE_URL = gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)'

Write-Host ""
Write-Host "Deployment successful!" -ForegroundColor Green
Write-Host "Service URL: $SERVICE_URL" -ForegroundColor Yellow
Write-Host ""
Write-Host "To view logs:"
Write-Host "  gcloud run services logs read $SERVICE_NAME --region $REGION"
Write-Host ""
Write-Host "To update environment variables:"
Write-Host "  gcloud run services update $SERVICE_NAME --set-env-vars KEY=VALUE"
