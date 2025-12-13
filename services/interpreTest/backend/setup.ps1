# Quick Setup & Run Script
# For Windows PowerShell

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  InterpreTest Backend - Setup & Run" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if venv exists
if (-not (Test-Path "venv\Scripts\Activate.ps1")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "Virtual environment created!" -ForegroundColor Green
    Write-Host ""
}

# Activate venv
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& "venv\Scripts\Activate.ps1"

# Check if dependencies are installed
$pipList = pip list
if (-not ($pipList -match "fastapi")) {
    Write-Host "Installing dependencies (this may take a few minutes)..." -ForegroundColor Yellow
    pip install -r requirements.txt
    Write-Host "Dependencies installed!" -ForegroundColor Green
}
else {
    Write-Host "Dependencies already installed." -ForegroundColor Green
}

Write-Host ""
Write-Host "Virtual environment is ready!" -ForegroundColor Green
Write-Host "Python: $(python --version)" -ForegroundColor Gray
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Quick Commands:" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  uvicorn app.main:app --reload --port 8001  - Run dev server" -ForegroundColor White
Write-Host "  jupyter lab                                - Start Jupyter" -ForegroundColor White
Write-Host "  pytest tests/                              - Run tests" -ForegroundColor White
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To run the dev server, type: uvicorn app.main:app --reload --port 8001" -ForegroundColor Yellow
Write-Host ""
