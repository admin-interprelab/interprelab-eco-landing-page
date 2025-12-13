# Quick setup script for Jupyter notebooks
# Run from: services/interpreTest/backend/

Write-Host "🚀 Setting up Jupyter notebook environment..." -ForegroundColor Cyan

# Check if virtual environment exists in parent directory
if (Test-Path "..\venv") {
    Write-Host "✅ Virtual environment found" -ForegroundColor Green
    
    # Activate virtual environment
    . ..\venv\Scripts\Activate.ps1
}
else {
    Write-Host "❌ Virtual environment not found in ..\venv. Run setup.ps1 in the backend directory first." -ForegroundColor Red
    exit 1
}

# Install requirements to ensure Jupyter is present
Write-Host "`n📦 Installing/Updating dependencies..." -ForegroundColor Yellow
pip install -r ..\requirements.txt

# Install IPython kernel
Write-Host "`n📦 Installing IPython kernel..." -ForegroundColor Yellow
python -m ipykernel install --user --name=interpretest --display-name="InterpreTest (Python 3)"

# Download spaCy models
Write-Host "`n📥 Downloading spaCy models..." -ForegroundColor Yellow
python -m spacy download en_core_web_lg
python -m spacy download es_core_news_lg

# Install scispaCy models
Write-Host "`n📥 Installing scispaCy models (this may take a few minutes)..." -ForegroundColor Yellow
pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.0/en_core_sci_lg-0.5.0.tar.gz
pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.0/en_ner_bc5cdr_md-0.5.0.tar.gz

# Create test directories
Write-Host "`n📁 Creating test directories..." -ForegroundColor Yellow
if (-not (Test-Path "test_audio")) {
    New-Item -ItemType Directory -Path "test_audio" | Out-Null
}
if (-not (Test-Path "test_data")) {
    New-Item -ItemType Directory -Path "test_data" | Out-Null
}

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "  1. Create .env file with API keys (see .env.example)"
Write-Host "  2. Add test audio files to test_audio/"
Write-Host "  3. Launch JupyterLab: " -NoNewline
Write-Host "jupyter lab" -ForegroundColor Yellow
Write-Host "`nNavigate to: " -NoNewline
Write-Host "notebooks/" -ForegroundColor Yellow
Write-Host ""
