# Backend Port Allocation

## Local Development Ports

Each backend service must run on a different port when developing locally to avoid conflicts.

| Service | Port | Local URL | Production URL |
|---------|------|-----------|----------------|
| interpretest-backend | 8001 | <http://localhost:8001> | <https://interpretest-backend.run.app> |
| interprecoach-backend | 8002 | <http://localhost:8002> | <https://interprecoach-backend.run.app> |
| interprestudy-backend | 8003 | <http://localhost:8003> | <https://interprestudy-backend.run.app> |
| interpretrack-backend | 8004 | <http://localhost:8004> | <https://interpretrack-backend.run.app> |
| interprelink-backend | 8005 | <http://localhost:8005> | <https://interprelink-backend.run.app> |

## Running Multiple Backends Simultaneously

```powershell
# Terminal 1 - interpretest
cd services/interpretest/backend
.\setup.ps1
uvicorn app.main:app --reload --port 8001

# Terminal 2 - interprecoach
cd services/interprecoach/backend
.\setup.ps1
uvicorn app.main:app --reload --port 8002

# Terminal 3 - interprestudy
cd services/interprestudy/backend
.\setup.ps1
uvicorn app.main:app --reload --port 8003

# And so on...
```

## Production Deployment

In production (Google Cloud Run), each backend gets its own unique URL, so port numbers don't matter. All backends expose port **8080** inside the container (as configured in Dockerfile and cloudbuild.yaml).

## Frontend Configuration

Update frontend `.env` files to point to the correct backend ports:

```env
# Local development (.env.development)
VITE_INTERPRETEST_API_URL=http://localhost:8001
VITE_INTERPRECOACH_API_URL=http://localhost:8002
VITE_INTERPRESTUDY_API_URL=http://localhost:8003
VITE_INTERPRETRACK_API_URL=http://localhost:8004
VITE_INTERPRELINK_API_URL=http://localhost:8005

# Production (.env.production)
VITE_INTERPRETEST_API_URL=https://interpretest-backend.run.app
VITE_INTERPRECOACH_API_URL=https://interprecoach-backend.run.app
VITE_INTERPRESTUDY_API_URL=https://interprestudy-backend.run.app
VITE_INTERPRETRACK_API_URL=https://interpretrack-backend.run.app
VITE_INTERPRELINK_API_URL=https://interprelink-backend.run.app
```
