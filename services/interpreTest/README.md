# InterpreBot Service

AI-powered assessment service for medical interpreters.

## Features

- Comprehensive skill assessment
- AI-powered feedback
- Performance tracking
- Personalized training recommendations

## Development

```bash
npm install
npm run dev
```

Service runs on <http://localhost:3001/interprebot>

## Build

```bash
npm run build
```

## Deployment

```bash
# Build Docker image
docker build -t interprebot .

# Deploy to Cloud Run
gcloud builds submit --config cloudbuild.yaml
```

## API

This is a frontend-only service with no backend API.
