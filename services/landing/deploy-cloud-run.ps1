#!/usr/bin/env pwsh
# Deploy Landing Service to Google Cloud Run
# Usage: .\deploy-cloud-run.ps1 [project-id] [region]

param(
    [string]$ProjectId = $env:GOOGLE_CLOUD_PROJECT,
    [string]$Region = "us-central1",
    [string]$ServiceName = "interprelab-landing"
)

# Colors for output
$Green = "`e[32m"
$Yellow = "`e[33m"
$Red = "`e[31m"
$Reset = "`e[0m"

Write-Host "${Green}=== InterpreLab Landing Service - Cloud Run Deployment ===${Reset}`n"

# Validate project ID
if (-not $ProjectId) {
    Write-Host "${Red}Error: Project ID not provided${Reset}"
    Write-Host "Usage: .\deploy-cloud-run.ps1 <project-id> [region]"
    exit 1
}

Write-Host "${Yellow}Project ID:${Reset} $ProjectId"
Write-Host "${Yellow}Region:${Reset} $Region"
Write-Host "${Yellow}Service Name:${Reset} $ServiceName`n"

# Step 1: Set project
Write-Host "${Green}Step 1: Setting GCP project...${Reset}"
gcloud config set project $ProjectId
if ($LASTEXITCODE -ne 0) {
    Write-Host "${Red}Failed to set project${Reset}"
    exit 1
}

# Step 2: Enable required APIs
Write-Host "`n${Green}Step 2: Enabling required APIs...${Reset}"
gcloud services enable run.googleapis.com containerregistry.googleapis.com cloudbuild.googleapis.com
if ($LASTEXITCODE -ne 0) {
    Write-Host "${Red}Failed to enable APIs${Reset}"
    exit 1
}

# Step 3: Build container image
Write-Host "`n${Green}Step 3: Building container image...${Reset}"
$ImageTag = "gcr.io/$ProjectId/$ServiceName:latest"
docker build -t $ImageTag .
if ($LASTEXITCODE -ne 0) {
    Write-Host "${Red}Failed to build Docker image${Reset}"
    exit 1
}

# Step 4: Push to Container Registry
Write-Host "`n${Green}Step 4: Pushing image to Container Registry...${Reset}"
docker push $ImageTag
if ($LASTEXITCODE -ne 0) {
    Write-Host "${Red}Failed to push image${Reset}"
    exit 1
}

# Step 5: Deploy to Cloud Run
Write-Host "`n${Green}Step 5: Deploying to Cloud Run...${Reset}"
gcloud run deploy $ServiceName `
    --image $ImageTag `
    --region $Region `
    --platform managed `
    --allow-unauthenticated `
    --memory 512Mi `
    --cpu 1 `
    --min-instances 0 `
    --max-instances 10 `
    --port 80 `
    --set-env-vars NODE_ENV=production

if ($LASTEXITCODE -ne 0) {
    Write-Host "${Red}Failed to deploy to Cloud Run${Reset}"
    exit 1
}

# Step 6: Get service URL
Write-Host "`n${Green}Step 6: Getting service URL...${Reset}"
$ServiceUrl = gcloud run services describe $ServiceName --region $Region --format 'value(status.url)'

Write-Host "`n${Green}=== Deployment Successful! ===${Reset}"
Write-Host "${Yellow}Service URL:${Reset} $ServiceUrl"
Write-Host "`nTest your deployment:"
Write-Host "  curl $ServiceUrl"
Write-Host "`nView logs:"
Write-Host "  gcloud run services logs read $ServiceName --region $Region"
Write-Host "`nView in console:"
Write-Host "  https://console.cloud.google.com/run/detail/$Region/$ServiceName"
