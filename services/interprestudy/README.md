# InterpreStudy Service

Specialized AI-powered training platform for medical interpreters.

## Features

- **Interactive Modules**: Video-based training modules with assessments
- **Core Dynamics Training**: Professional development courses
- **Conversation Simulator**: Real-time practice with AI
- **Smart Flashcards**: Adaptive learning system
- **AI Quiz**: Intelligent assessment generation
- **Body Mapper**: Anatomical terminology training
- **Scenario Generator**: Custom medical scenarios
- **Terminology Lookup**: Medical terminology database
- **Interactive AI Chat**: General learning assistant
- **Study Settings**: Personalized learning preferences

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Available at http://localhost:3002/interprestudy

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Docker

```bash
# Build image
docker build -t interprestudy-service .

# Run container
docker run -p 8080:80 interprestudy-service
```

### Google Cloud Run

```bash
# Deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Or manual deployment
gcloud run deploy interprestudy-service \
  --image gcr.io/PROJECT_ID/interprestudy-service \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Environment Variables

No environment variables required for basic functionality.

For advanced features (Gemini API integration), add:

- `VITE_GEMINI_API_KEY` - Google Gemini API key

## Architecture

- **Framework**: React 19 + TypeScript
- **Builder**: Vite  
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router (basename: `/interprestudy`)
- **Production Server**: Nginx

## Components

### Pages

- `InterpreStudy.tsx` - Main page with tabbed interface

### Components

- `interprestudy/InteractiveChat.tsx` - AI chat interface
- `interprestudy/TerminologyLookup.tsx` - Medical terms
- `interprestudy/StudySettings.tsx` - User preferences
- `interprestudy/modules/` - Training modules

## Bundle Size

Target: < 200KB gzipped

Optimizations:

- Code splitting
- Tree shaking
- Gzip compression
- Manual chunks for vendors

## Service URL

- **Development**: `http://localhost:3002/interprestudy`
- **Production**: `https://yourdomain.com/interprestudy`

## Status

✅ Service extracted and operational
