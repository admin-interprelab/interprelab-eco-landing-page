# Quick Start Guide: Running All Backends

This guide shows you how to run all backend services simultaneously for local development.

## Port Assignments

| Service | Port | Command |
|---------|------|---------|
| interpretest-backend | 8001 | `uvicorn app.main:app --reload --port 8001` |
| interprecoach-backend | 8002 | `uvicorn app.main:app --reload --port 8002` |
| interprestudy-backend | 8003 | `uvicorn app.main:app --reload --port 8003` |
| interpretrack-backend | 8004 | `uvicorn app.main:app --reload --port 8004` |
| interprelink-backend | 8005 | `uvicorn app.main:app --reload --port 8005` |

## Setup All Backends

### Option 1: Quick Setup Script (PowerShell)

Create `setup-all-backends.ps1` in the project root:

```powershell
# Setup all backend services
$backends = @(
    @{Name="interpreTest"; Port=8001},
    @{Name="interpreCoach"; Port=8002},
    @{Name="interprestudy"; Port=8003},
    @{Name="interpreTrack"; Port=8004},
    @{Name="interpreLink/interprehub"; Port=8005}
)

foreach ($backend in $backends) {
    Write-Host "`n=== Setting up $($backend.Name) backend ===" -ForegroundColor Cyan
    
    $path = if ($backend.Name -eq "interpreLink/interprehub") {
        "services\interpreLink\interprehub\backend"
    } else {
        "services\$($backend.Name)\backend"
    }
    
    if (Test-Path $path) {
        Push-Location $path
        
        # Create venv if it doesn't exist
        if (-not (Test-Path "venv")) {
            Write-Host "Creating virtual environment..." -ForegroundColor Yellow
            python -m venv venv
        }
        
        Write-Host "Service ready on port $($backend.Port)" -ForegroundColor Green
        Pop-Location
    }
}

Write-Host "`n✅ All backends setup complete!" -ForegroundColor Green
Write-Host "`nTo run a backend:" -ForegroundColor Cyan
Write-Host "  cd services/[SERVICE]/backend"
Write-Host "  .\setup.ps1"
Write-Host "  uvicorn app.main:app --reload --port [PORT]"
```

### Option 2: Manual Setup

For each backend service, run:

```powershell
# Example for interpreCoach
cd services/interpreCoach/backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8002
```

## Running Multiple Backends

You'll need separate terminal windows for each backend:

### Terminal 1: interpretest-backend

```powershell
cd services/interpreTest/backend
venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8001
```

### Terminal 2: interprecoach-backend

```powershell
cd services/interpreCoach/backend
venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8002
```

### Terminal 3: interprestudy-backend

```powershell
cd services/interprestudy/backend
venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8003
```

### Terminal 4: interpretrack-backend

```powershell
cd services/interpreTrack/backend
venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8004
```

### Terminal 5: interprelink-backend

```powershell
cd services/interpreLink/interprehub/backend
venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8005
```

## Verify All Services Are Running

Test each endpoint:

- <http://localhost:8001/> - interpretest-backend
- <http://localhost:8002/> - interprecoach-backend
- <http://localhost:8003/> - interprestudy-backend
- <http://localhost:8004/> - interpretrack-backend
- <http://localhost:8005/> - interprelink-backend

Expected response for each:

```json
{
  "service": "[service-name]-backend",
  "status": "running",
  "version": "1.0.0"
}
```

## API Documentation

Each service has interactive Swagger documentation:

- <http://localhost:8001/docs>
- <http://localhost:8002/docs>
- <http://localhost:8003/docs>
- <http://localhost:8004/docs>
- <http://localhost:8005/docs>

## Tips

1. **VS Code**: Use the split terminal feature to run multiple backends
2. **Windows Terminal**: Create multiple tabs for each backend
3. **tmux/screen**: For Linux/Mac users running multiple sessions
4. **Docker Compose**: For advanced users (future enhancement)

## Troubleshooting

### Port already in use

```powershell
# Kill process on port
netstat -ano | findstr :[PORT]
taskkill /PID [PID] /F
```

### Import errors

Make sure you're in the correct directory and venv is activated:

```powershell
# Should show: (venv) at the beginning of your prompt
Get-Location  # Should end with \backend
```
