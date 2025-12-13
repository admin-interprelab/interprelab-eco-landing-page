#!/usr/bin/env bash

# Quick setup script for Jupyter notebooks
# Run from: services/interpreTest/backend/

set -e

echo "🚀 Setting up Jupyter notebook environment..."

# Activate virtual environment
if [ -d "../venv" ]; then
    echo "✅ Virtual environment found"
    source ../venv/bin/activate
else
    echo "❌ Virtual environment not found in ../venv. Run setup.ps1 in the backend directory first."
    exit 1
fi

# Install requirements to ensure Jupyter is present
echo "📦 Installing/Updating dependencies..."
pip install -r ../requirements.txt

# Install Jupyter kernel
echo "📦 Installing IPython kernel..."
python -m ipykernel install --user --name=interpretest --display-name="InterpreTest (Python 3)"

# Download spaCy models
echo "📥 Downloading spaCy models..."
python -m spacy download en_core_web_lg
python -m spacy download es_core_news_lg

# Install scispaCy models
echo "📥 Installing scispaCy models..."
pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.0/en_core_sci_lg-0.5.0.tar.gz
pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.0/en_ner_bc5cdr_md-0.5.0.tar.gz

# Create test directories
echo "📁 Creating test directories..."
mkdir -p test_audio
mkdir -p test_data

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Create .env file with API keys (see .env.example)"
echo "  2. Add test audio files to test_audio/"
echo "  3. Launch JupyterLab: jupyter lab"
echo ""
echo "Navigate to: notebooks/"
echo ""
