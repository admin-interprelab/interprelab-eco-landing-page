@echo off
REM InterpreLab Docker Deployment Script for Windows
REM This script builds and deploys the InterpreLab application

setlocal enabledelayedexpansion

REM Configuration
set IMAGE_NAME=interprelab/app
set CONTAINER_NAME=interprelab-app
set REGISTRY=ghcr.io/admin-interprelab
set VERSION=%1
if "%VERSION%"=="" set VERSION=latest

REM Colors (limited support in Windows)
set GREEN=[92m
set RED=[91m
set YELLOW=[93m
set BLUE=[94m
set NC=[0m

echo %BLUE%[%date% %time%]%NC% Starting InterpreLab deployment...

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo %RED%[ERROR]%NC% Docker is not running. Please start Docker and try again.
    exit /b 1
)
echo %GREEN%[SUCCESS]%NC% Docker is running

REM Check environment variables
echo %BLUE%[INFO]%NC% Checking environment variables...
if "%VITE_SUPABASE_URL%"=="" (
    echo %YELLOW%[WARNING]%NC% VITE_SUPABASE_URL is not set
)
if "%VITE_SUPABASE_PUBLISHABLE_KEY%"=="" (
    echo %YELLOW%[WARNING]%NC% VITE_SUPABASE_PUBLISHABLE_KEY is not set
)

REM Build Docker image
echo %BLUE%[INFO]%NC% Building Docker image: %IMAGE_NAME%:%VERSION%
docker build --target production --tag %IMAGE_NAME%:%VERSION% --tag %IMAGE_NAME%:latest --build-arg NODE_ENV=production .
if errorlevel 1 (
    echo %RED%[ERROR]%NC% Failed to build Docker image
    exit /b 1
)
echo %GREEN%[SUCCESS]%NC% Docker image built successfully

REM Stop and remove existing container
echo %BLUE%[INFO]%NC% Cleaning up existing containers...
docker ps -a --format "table {{.Names}}" | findstr /r "^%CONTAINER_NAME%$" >nul 2>&1
if not errorlevel 1 (
    echo %BLUE%[INFO]%NC% Stopping existing container: %CONTAINER_NAME%
    docker stop %CONTAINER_NAME% >nul 2>&1
    echo %BLUE%[INFO]%NC% Removing existing container: %CONTAINER_NAME%
    docker rm %CONTAINER_NAME% >nul 2>&1
)
echo %GREEN%[SUCCESS]%NC% Container cleanup completed

REM Run new container
echo %BLUE%[INFO]%NC% Starting new container: %CONTAINER_NAME%
docker run -d ^
    --name %CONTAINER_NAME% ^
    --restart unless-stopped ^
    -p 8080:8080 ^
    -e NODE_ENV=production ^
    -e VITE_SUPABASE_URL=%VITE_SUPABASE_URL% ^
    -e VITE_SUPABASE_PUBLISHABLE_KEY=%VITE_SUPABASE_PUBLISHABLE_KEY% ^
    -e VITE_SUPABASE_PROJECT_ID=%VITE_SUPABASE_PROJECT_ID% ^
    -e VITE_GOOGLE_API_KEY=%VITE_GOOGLE_API_KEY% ^
    %IMAGE_NAME%:%VERSION%

if errorlevel 1 (
    echo %RED%[ERROR]%NC% Failed to start container
    exit /b 1
)
echo %GREEN%[SUCCESS]%NC% Container started successfully

REM Wait for container to start
echo %BLUE%[INFO]%NC% Waiting for container to start...
timeout /t 10 /nobreak >nul

REM Check container health
echo %BLUE%[INFO]%NC% Checking container health...
set /a attempts=0
set /a max_attempts=30

:health_check_loop
set /a attempts+=1
curl -f http://localhost:8080/health >nul 2>&1
if not errorlevel 1 (
    echo %GREEN%[SUCCESS]%NC% Health check passed
    goto health_check_done
)

if %attempts% geq %max_attempts% (
    echo %RED%[ERROR]%NC% Health check failed after %max_attempts% attempts
    exit /b 1
)

echo %BLUE%[INFO]%NC% Health check attempt %attempts%/%max_attempts% failed, retrying...
timeout /t 2 /nobreak >nul
goto health_check_loop

:health_check_done

REM Show container logs
echo %BLUE%[INFO]%NC% Container logs (last 50 lines):
docker logs --tail 50 %CONTAINER_NAME%

echo.
echo %GREEN%[SUCCESS]%NC% Deployment completed successfully!
echo %BLUE%[INFO]%NC% Application is running at:
echo   - http://localhost:8080
echo   - Health check: http://localhost:8080/health
echo.
echo To view logs: docker logs -f %CONTAINER_NAME%
echo To stop: docker stop %CONTAINER_NAME%

endlocal
