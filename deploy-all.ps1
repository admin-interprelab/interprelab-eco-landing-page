# Deploy all InterpreLab microservices to Google Cloud Run
# PowerShell version
# Usage: powershell -ExecutionPolicy Bypass -File deploy-all.ps1

$ErrorActionPreference = "Stop"

$REGION = "us-central1"
$PROJECT_ID = (gcloud config get-value project 2>$null)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  InterpreLab Services Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Project: $PROJECT_ID" -ForegroundColor White
Write-Host "Region: $REGION" -ForegroundColor White
Write-Host ""

# Check if gcloud is configured
if ([string]::IsNullOrEmpty($PROJECT_ID)) {
    Write-Host "Error: No GCP project configured" -ForegroundColor Red
    Write-Host "Run: gcloud config set project YOUR_PROJECT_ID" -ForegroundColor Yellow
    exit 1
}

# Services to deploy (in order)
$SERVICES = @("auth", "interpreTest", "interprestudy", "interpreCoach", "interpretrack", "interpreLink/interprehub")

Write-Host "Will deploy $($SERVICES.Count) services:" -ForegroundColor Yellow
foreach ($service in $SERVICES) {
    Write-Host "  - $service" -ForegroundColor Gray
}
Write-Host ""

$confirm = Read-Host "Continue with deployment? (y/n)"
if ($confirm -ne "y") {
    Write-Host "Deployment cancelled" -ForegroundColor Yellow
    exit 0
}

# Deploy each service
foreach ($service in $SERVICES) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  Deploying: $service-service" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    Set-Location "services/$service"
    
    try {
        if ($service -eq "auth") {
            # Auth service needs secrets
            Write-Host "Deploying Auth Service with secrets..." -ForegroundColor Yellow
            
            # Check if secrets exist
            $hasSecrets = $true
            try {
                gcloud secrets describe JWT_SECRET 2>$null | Out-Null
            }
            catch {
                Write-Host "Warning: JWT_SECRET not found in Secret Manager" -ForegroundColor Yellow
                $hasSecrets = $false
            }
            
            if ($hasSecrets) {
                gcloud run deploy "$service-service" `
                    --source . `
                    --platform managed `
                    --region $REGION `
                    --allow-unauthenticated `
                    --set-env-vars "NODE_ENV=production" `
                    --set-secrets "JWT_SECRET=JWT_SECRET:latest,SUPABASE_SERVICE_KEY=SUPABASE_SERVICE_KEY:latest" `
                    --memory 512Mi `
                    --cpu 1 `
                    --timeout 60
            }
            else {
                Write-Host "Skipping auth service - secrets not configured" -ForegroundColor Yellow
                Write-Host "See DEPLOYMENT-GUIDE.md for secret setup" -ForegroundColor Yellow
                Set-Location ../..
                continue
            }
        }
        else {
            # Other services
            gcloud run deploy "$service-service" `
                --source . `
                --platform managed `
                --region $REGION `
                --allow-unauthenticated `
                --memory 512Mi `
                --cpu 1 `
                --timeout 30
        }
        
        Write-Host "✓ $service deployed successfully" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ $service deployment failed: $_" -ForegroundColor Red
        Set-Location ../..
        exit 1
    }
    
    Set-Location ../..
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deployment Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "View all services:" -ForegroundColor White
Write-Host "  gcloud run services list --region $REGION" -ForegroundColor Gray
Write-Host ""

