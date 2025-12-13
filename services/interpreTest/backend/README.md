# interpreTest Backend

AI-powered interpreter assessment backend service using FastAPI, NLP, and LLMs.

## Features

- Audio transcription (Whisper API)
- Grammar and syntax analysis (spaCy)
- Medical terminology validation (scispaCy + UMLS)
- Performance evaluation (Claude 3.5 Sonnet)
- Personalized feedback generation

## Setup

### Prerequisites

- Python 3.11+
- API keys: OpenAI, Anthropic

### Installation

#### Quick Setup (Windows)

```powershell
# Run the setup script - it will create venv and install everything
.\setup.ps1
```

#### Quick Setup (Linux/Mac)

```bash
# Make script executable and run
chmod +x activate.sh
source activate.sh
```

#### Manual Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell):
venv\Scripts\Activate.ps1
# Windows (CMD):
venv\Scripts\activate.bat
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy models
python -m spacy download es_core_news_lg
python -m spacy download en_core_web_lg
python -m spacy download en_core_sci_md
```

### Environment Variables

Create `.env` file:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://...
SUPABASE_KEY=eyJ...
REDIS_URL=redis://localhost:6379
```

### Run Locally

```bash
# Activate virtual environment (if not already activated)
# Windows PowerShell: venv\Scripts\Activate.ps1
# Windows CMD: venv\Scripts\activate.bat
# Linux/Mac: source venv/bin/activate

# Run development server on port 8001
uvicorn app.main:app --reload --port 8001
```

**Port Allocation for Local Development:**

- interpretest-backend: **Port 8001**
- interprecoach-backend: Port 8002
- interprestudy-backend: Port 8003
- interpretrack-backend: Port 8004
- interprelink-backend: Port 8005

API will be available at:

- Root: `http://localhost:8001/`
- Health check: `http://localhost:8001/health`
- Interactive API docs: `http://localhost:8001/docs`

**Current Status:**

```json
{"service":"interpretest-backend","status":"running","version":"1.0.0"}
```

### Run Tests

```bash
pytest tests/
```

## Jupyter Notebooks (Phase 2 Prototyping)

Jupyter notebooks for testing and prototyping are in `notebooks/`:

- `01_transcription_test.ipynb` - Whisper API audio transcription testing
- `02_spacy_grammar_analysis.ipynb` - spaCy grammar & linguistic analysis
- `03_scispacy_medical_ner.ipynb` - Medical entity recognition with scispaCy
- `04_claude_feedback_generation.ipynb` - Claude 3.5 feedback generation

**Setup Notebooks:**

```powershell
# Windows PowerShell (recommended):
cd notebooks
.\setup_notebooks.ps1

# Linux/Mac:
cd notebooks
chmod +x setup_notebooks.sh
./setup_notebooks.sh
```

This will:

- Install IPython kernel
- Download spaCy models (en_core_web_lg, es_core_news_lg)
- Install scispaCy models (en_core_sci_lg, en_ner_bc5cdr_md)
- Create test directories

**Launch JupyterLab:**

```powershell
jupyter lab
```

Then navigate to `notebooks/` and start with `01_transcription_test.ipynb`.

**See:** `notebooks/README.md` for detailed documentation.

## API Endpoints

- `POST /api/analyze/audio` - Upload and analyze audio
- `POST /api/analyze/text` - Analyze pre-transcribed text
- `GET /api/score/{session_id}` - Get assessment score
- `GET /health` - Health check

## Deployment

```bash
# Build Docker image
docker build -t interpretest-backend .

# Deploy to Cloud Run
gcloud builds submit --config cloudbuild.yaml
```

## Architecture

```
Audio → Whisper (transcribe) → spaCy (grammar) 
     → scispaCy (medical NER) → Claude (feedback)
     → Database → Frontend
```
