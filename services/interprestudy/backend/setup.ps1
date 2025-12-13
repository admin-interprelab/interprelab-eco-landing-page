# PowerShell Setup Script for InterpreStudy Backend

Write-Host "🚀 Setting up InterpreStudy Backend..." -ForegroundColor Cyan

# Check for Python
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Python not found! Please install Python 3.11+" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Found: $pythonVersion" -ForegroundColor Green

# Create Virtual Environment
if (-not (Test-Path "venv")) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}
else {
    Write-Host "✅ Virtual environment exists" -ForegroundColor Green
}

# Activate and Install Requirements
Write-Host "📥 Installing dependencies..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Create .env if not exists
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" -Destination ".env" -ErrorAction SilentlyContinue
    if (-not (Test-Path ".env")) {
        New-Item -Path ".env" -ItemType File -Value "# API Keys`nOPENAI_API_KEY=`nGOOGLE_API_KEY=`n"
    }
}

Write-Host "`n✅ Setup Complete!" -ForegroundColor Green
Write-Host "To run the server:" -ForegroundColor Cyan
Write-Host "  .\venv\Scripts\Activate.ps1"
Write-Host "  uvicorn app.main:app --reload --port 8003"
