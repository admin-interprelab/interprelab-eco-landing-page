# Supabase Edge Functions Deployment Guide

## Functions Created

### 1. wellness-chat

AI-powered wellness counselor chat for medical interpreters with streaming support using **Google Gemini**.

**Deploy:**

```bash
supabase functions deploy wellness-chat
```

### 2. debriefing-questionnaire

Analyzes debriefing questionnaire responses and provides personalized insights using **Google Gemini**.

**Deploy:**

```bash
supabase functions deploy debriefing-questionnaire
```

## Environment Variables Required

Set the Google Gemini API key as a secret:

```bash
supabase secrets set GEMINI_API_KEY=your_gemini_api_key_here
```

**Get your Gemini API key:** <https://makersuite.google.com/app/apikey>

## Testing Locally

Start Supabase locally:

```bash
supabase start
```

Set local environment variable:

```bash
# Create .env file in supabase/functions/
echo "GEMINI_API_KEY=your_gemini_api_key_here" > supabase/functions/.env
```

Serve functions:

```bash
supabase functions serve wellness-chat
supabase functions serve debriefing-questionnaire
```

## Deployment

Deploy both functions:

```bash
supabase functions deploy wellness-chat
supabase functions deploy debriefing-questionnaire
```

Verify deployment:

```bash
supabase functions list
```

## Usage

The functions are automatically called by the InterpreWellness page:

- `wellness-chat`: Real-time AI counselor chat with streaming
- `debriefing-questionnaire`: Analyzes structured debriefing responses

Both functions use **Gemini 1.5 Flash** for fast, cost-effective, high-quality responses.

## API Model

- **Model**: gemini-1.5-flash
- **Benefits**: Fast, generous free tier, excellent quality
- **Cost**: Much more affordable than GPT-4
