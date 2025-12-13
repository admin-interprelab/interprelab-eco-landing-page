# Deploy all InterpreLab microservices to Google Cloud Run
# PowerShell version

$ErrorActionPreference = "Stop"
$REGION = "us-central1"
$PROJECT_ID = (gcloud config get-value project 2>$null)

Write-Host "InterpreLab Services Deployment" -ForegroundColor Cyan
Write-Host "Project: $PROJECT_ID" -ForegroundColor White
Write-Host "Region: $REGION" -ForegroundColor White

# Check if gcloud is configured
if ([string]::IsNullOrEmpty($PROJECT_ID)) {
    Write-Host "Error: No GCP project configured" -ForegroundColor Red
    exit 1
}

# Services to deploy (in order)
$SERVICES = @("auth", "interpreTest", "interprestudy", "interpreCoach", "interpretrack", "interpreLink/interprehub")

Write-Host "Will deploy $($SERVICES.Count) services" -ForegroundColor Yellow
$confirm = Read-Host "Continue? (y/n)"
if ($confirm -ne "y") {
    exit 0
}

# Deploy each service
foreach ($service in $SERVICES) {
    Write-Host "Deploying: $service" -ForegroundColor Cyan
    Set-Location "services/$service"
    
    try {
        gcloud run deploy "$service-service" --source . --platform managed --region $REGION --allow-unauthenticated --memory 512Mi --cpu 1
        Write-Host "Success: $service deployed" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed: $service" -ForegroundColor Red
        Set-Location ../..
        exit 1
    }
    Set-Location ../..
}

Write-Host "Deployment Complete!" -ForegroundColor Green
