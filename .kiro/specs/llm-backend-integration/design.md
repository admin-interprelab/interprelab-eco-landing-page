# Design Document: LLM Backend Integration

## Overview

This document outlines the architectural design for integrating AI/LLM backends into the InterpreLab microservices ecosystem. Each frontend service will have a corresponding Python backend service for AI processing, NLP analysis, and LLM orchestration.

## Architectural Principles

1. **Service Independence**: Each backend service is fully independent
2. **Single Responsibility**: Each backend handles AI/LLM tasks for its corresponding frontend
3. **Scalability**: Backends can scale independently based on AI workload
4. **Cost Optimization**: Use appropriate LLM models based on task complexity
5. **Development Iteration**: Jupyter/Colab for rapid prototyping → Production FastAPI

---

## Service Architecture Map

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Browser                            │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
┌───────▼────────┐                    ┌────────▼────────┐
│ Landing Service│                    │ Other Services  │
│ (React/Vite)   │                    │ (React/Vite)    │
└───────┬────────┘                    └────────┬────────┘
        │                                      │
        │ HTTP/REST API                        │
        │                                      │
┌───────▼────────────────────────────────────▼─────────┐
│           Python Backend Services Layer               │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐│
│  │interpretest- │  │interprecoach-│  │interprestudy││
│  │backend       │  │backend       │  │-backend     ││
│  │(FastAPI)     │  │(FastAPI)     │  │(FastAPI)    ││
│  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘│
└─────────┼──────────────────┼──────────────────┼───────┘
          │                  │                  │
          │ NLP + LLM Pipeline                  │
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼───────┐
│                 AI Services Layer                      │
│  ┌─────────┐  ┌──────────┐  ┌────────┐  ┌─────────┐ │
│  │ Whisper │  │  spaCy   │  │ GPT-4  │  │ Gemini  │ │
│  │   STT   │  │   NLP    │  │ Claude │  │   Pro   │ │
│  └─────────┘  └──────────┘  └────────┘  └─────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## Backend Service Specifications

### 1. interpretest-backend (AI Training & Assessment)

**Technology Stack:**

- **Framework**: FastAPI 0.104+
- **NLP**: spaCy 3.7, scispaCy 0.5, NLTK
- **Speech**: OpenAI Whisper, Deepgram
- **LLM**: Claude 3.5 Sonnet (primary), GPT-4 (fallback)
- **Database**: Supabase PostgreSQL
- **Deployment**: Google Cloud Run

**Core Features:**

1. Audio transcription (multilingual)
2. Grammar and syntax analysis
3. Medical terminology validation
4. Performance scoring
5. Personalized feedback generation

**API Endpoints:**

```
POST   /api/analyze/audio          # Upload & analyze interpreter audio
POST   /api/analyze/text           # Analyze text transcript
GET    /api/score/{session_id}     # Get performance score
POST   /api/feedback/generate      # Generate personalized feedback
GET    /api/history/{user_id}      # Get assessment history
```

**NLP Pipeline:**

```python
1. Audio → Whisper (transcribe) → Text
2. Text → spaCy (POS, dependencies) → Grammar analysis
3. Text → scispaCy (NER) → Medical entities
4. Entities → UMLS validation → Terminology check
5. All data → Claude → Comprehensive evaluation + feedback
```

**Data Flow:**

```
Frontend (React) 
  → Record audio 
  → POST to /api/analyze/audio
  → Backend processes (30-60s)
  → Return {score, feedback, insights}
  → Frontend displays dashboard
```

---

### 2. interprecoach-backend (Real-Time AI Assistance)

**Technology Stack:**

- **Framework**: FastAPI + WebSocket support
- **NLP**: spaCy, Stanza (streaming)
- **Speech**: Deepgram (streaming STT), AssemblyAI
- **LLM**: Gemini 1.5 Pro (multimodal, fast)
- **Real-time**: Redis for state management
- **Deployment**: Google Cloud Run (always warm)

**Core Features:**

1. Real-time speech-to-text streaming
2. Live terminology suggestions
3. Context-aware definitions + images
4. Conversation summarization
5. Voice quality analysis

**API Endpoints:**

```
WS     /ws/stream                  # WebSocket for live audio
POST   /api/lookup/term            # Get term definition + context
POST   /api/summarize              # Summarize conversation
POST   /api/voice/analyze          # Analyze voice quality
GET    /api/suggestions/{context}  # Get predictive suggestions
```

**Real-Time Pipeline:**

```python
1. Audio stream → Deepgram (streaming) → Live text
2. Text → spaCy (realtime) → Extract entities as spoken
3. Entities → Knowledge base → Definitions + images
4. Context → Gemini → Predictive next terms
5. Full conversation → Gemini → Bullet point summary
```

**Data Flow:**

```
Frontend
  → Open WebSocket connection
  → Stream audio chunks
  → Backend processes in real-time (<500ms)
  → Send back: {term, definition, image_url}
  → Frontend shows tooltip/card
```

---

### 3. interprestudy-backend (Learning & Content Generation)

**Technology Stack:**

- **Framework**: FastAPI
- **NLP**: spaCy, Transformers
- **LLM**: GPT-4 (dialogue), Claude (structured content)
- **Content**: LangChain for prompt chaining
- **Database**: Supabase + Vector DB (Pinecone/Weaviate)
- **Deployment**: Google Cloud Run

**Core Features:**

1. Flashcard generation from materials
2. Mock scenario creation (dialogues)
3. Adaptive quiz generation
4. Learning path personalization

**API Endpoints:**

```
POST   /api/flashcards/generate    # Generate flashcards from text
POST   /api/scenarios/create       # Create mock dialogue
POST   /api/quiz/generate          # Generate adaptive quiz
POST   /api/learning-path/{user}   # Get personalized path
GET    /api/content/{topic}        # Get study content
```

**Content Generation Pipeline:**

```python
1. Topic → GPT-4 → Generate realistic dialogues
2. Dialogues → spaCy → Extract key vocabulary
3. Vocabulary → Claude → Create flashcards
4. User performance → LangChain → Adaptive difficulty
5. All interactions → Vector DB → Semantic search
```

---

### 4. interpretrack-backend (Analytics & Automation)

**Technology Stack:**

- **Framework**: FastAPI
- **NLP**: spaCy (lightweight), GPT-3.5 Turbo
- **LLM**: Gemini Flash (cost-effective)
- **Analytics**: Pandas, NumPy
- **Deployment**: Google Cloud Run

**Core Features:**

1. Auto-categorize call logs
2. Extract billable information
3. Generate reports
4. Earnings predictions

**API Endpoints:**

```
POST   /api/categorize/call        # Auto-categorize call
POST   /api/extract/billing        # Extract billing info
GET    /api/reports/{period}       # Generate reports
POST   /api/predict/earnings       # Predict earnings
```

---

### 5. interprelink-backend (Community & Moderation)

**Technology Stack:**

- **Framework**: FastAPI
- **NLP**: spaCy, Perspective API (toxicity)
- **LLM**: Gemini Pro (high-volume)
- **Recommendation**: TensorFlow Recommenders
- **Deployment**: Google Cloud Run

**Core Features:**

1. Content moderation
2. Job matching
3. Q&A assistance
4. Resource recommendations

**API Endpoints:**

```
POST   /api/moderate/content       # Check content safety
POST   /api/match/jobs             # Match interpreter to jobs
POST   /api/qa/suggest             # Suggest Q&A answers
GET    /api/recommend/{user}       # Personalized recommendations
```

---

## Development Workflow

### Phase 1: Prototyping (Jupyter/Colab)

```
1. Create notebook per feature
2. Test NLP pipelines
3. Experiment with prompts
4. Benchmark different LLMs
5. Measure accuracy/cost
```

### Phase 2: Productionization (FastAPI)

```
1. Convert notebook code to Python modules
2. Create FastAPI endpoints
3. Add error handling, validation
4. Implement caching (Redis)
5. Add monitoring/logging
```

### Phase 3: Deployment (Cloud Run)

```
1. Dockerize backend
2. Create cloudbuild.yaml
3. Deploy to Cloud Run
4. Set up CI/CD
5. Monitor performance
```

---

## Deployment Architecture

### Service Naming Convention

```
Frontend:  interpretest → https://interpretest.run.app
Backend:   interpretest → https://interpretest-api.run.app
```

### Environment Variables

```env
# All backends
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIza...
SUPABASE_URL=https://...
SUPABASE_KEY=eyJ...

# Service-specific
REDIS_URL=redis://...
PINECONE_API_KEY=...
```

### Resource Allocation (Cloud Run)

```yaml
interpretest-backend:
  memory: 2Gi
  cpu: 2
  timeout: 300s  # 5 min for long analysis

interprecoach-backend:
  memory: 1Gi
  cpu: 1
  timeout: 3600s  # 1 hour for streaming
  min-instances: 1  # Always warm

interprestudy-backend:
  memory: 1Gi
  cpu: 1
  timeout: 120s

interpretrack-backend:
  memory: 512Mi
  cpu: 1
  timeout: 60s
```

---

## Cost Optimization Strategy

### LLM Selection by Task

| Task | LLM | Cost/1M tokens | Reason |
|------|-----|----------------|---------|
| Deep linguistic analysis | Claude 3.5 | $3 | Best accuracy |
| Real-time streaming | Gemini 1.5 Pro | $1.25 | Fast, multimodal |
| Content generation | GPT-4 | $30 | Creative |
| Categorization | GPT-3.5 Turbo | $0.50 | Cheap, fast |
| High-volume | Gemini Flash | $0.075 | Ultra cheap |

### Caching Strategy

```python
# Redis cache for common queries
- Medical term definitions: 24hr TTL
- Generated scenarios: 7 day TTL
- Assessment feedback: No cache (personalized)
```

---

## Security Considerations

1. **API Key Management**: Use Google Secret Manager
2. **User Authentication**: JWT tokens from frontend
3. **Rate Limiting**: Per-user limits on expensive operations
4. **Data Privacy**: HIPAA compliance for medical data
5. **Audit Logging**: Log all LLM interactions

---

## Monitoring & Observability

### Metrics to Track

```
- API response time (p50, p95, p99)
- LLM token usage & costs
- Error rates by endpoint
- Cache hit rates
- User satisfaction scores
```

### Logging

```python
# Structured logging with Cloud Logging
{
  "service": "interpretest-backend",
  "endpoint": "/api/analyze/audio",
  "user_id": "user_123",
  "duration_ms": 45000,
  "tokens_used": 15000,
  "cost_usd": 0.45,
  "llm_model": "claude-3-5-sonnet"
}
```

---

## Next Steps

See [tasks.md](./tasks.md) for detailed implementation plan.
