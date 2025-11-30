# Premium Dashboard Setup Script (PowerShell)
# This script sets up the complete premium dashboard infrastructure

Write-Host "🚀 Setting up Premium Dashboard Infrastructure..." -ForegroundColor Blue

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if required tools are installed
function Test-Requirements {
    Write-Status "Checking requirements..."

    if (!(Get-Command supabase -ErrorAction SilentlyContinue)) {
        Write-Error "Supabase CLI is not installed. Please install it first."
        exit 1
    }

    if (!(Get-Command gcloud -ErrorAction SilentlyContinue)) {
        Write-Error "Google Cloud SDK is not installed. Please install it first."
        exit 1
    }

    Write-Success "All requirements met!"
}

# Setup environment file
function Set-Environment {
    Write-Status "Setting up environment configuration..."

    if (!(Test-Path .env)) {
        if (Test-Path .env.example) {
            Copy-Item .env.example .env
            Write-Warning "Created .env file from .env.example. Please update with your actual credentials."
        } else {
            Write-Error ".env.example file not found. Please create it first."
            exit 1
        }
    } else {
        Write-Warning ".env file already exists. Skipping creation."
    }
}

# Deploy Supabase functions
function Deploy-Functions {
    Write-Status "Deploying Supabase Edge Functions..."

    # Check if Supabase is linked
    $statusResult = supabase status 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Supabase project not linked. Please run 'supabase link' first."
        return $false
    }

    # Deploy each function
    $functions = @("generate-earnings-projection", "calculate-performance-metrics", "sync-learning-data", "update-goal-progress")

    foreach ($func in $functions) {
        Write-Status "Deploying function: $func"
        $result = supabase functions deploy $func 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Deployed $func successfully"
        } else {
            Write-Error "Failed to deploy $func"
            Write-Host $result -ForegroundColor Red
        }
    }
}

# Run database migrations
function Invoke-Migrations {
    Write-Status "Running database migrations..."

    $result = supabase db push 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Database migrations completed successfully"
        return $true
    } else {
        Write-Error "Database migration failed"
        Write-Host $result -ForegroundColor Red
        return $false
    }
}

# Setup Google Cloud project
function Set-GCloud {
    Write-Status "Setting up Google Cloud integration..."

    # Check if user is authenticated
    $authResult = gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>&1
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($authResult)) {
        Write-Warning "Not authenticated with Google Cloud. Please run 'gcloud auth login' first."
        return $false
    }

    # Enable required APIs
    Write-Status "Enabling required Google Cloud APIs..."
    gcloud services enable aiplatform.googleapis.com
    gcloud services enable cloudfunctions.googleapis.com

    Write-Success "Google Cloud setup completed"
    return $true
}

# Create sample data
function New-SampleData {
    Write-Status "Creating sample data..."

    # This would typically insert sample subscription plans, goals, etc.
    # For now, we'll just print a message
    Write-Warning "Sample data creation not implemented yet. Please add manually through Supabase dashboard."
}

# Main execution
function Main {
    Write-Host "🎯 Premium Dashboard Setup" -ForegroundColor Magenta
    Write-Host "==========================" -ForegroundColor Magenta

    Test-Requirements
    Set-Environment

    # Ask user what they want to do
    Write-Host ""
    Write-Host "What would you like to set up?"
    Write-Host "1) Complete setup (recommended)"
    Write-Host "2) Deploy Supabase functions only"
    Write-Host "3) Run database migrations only"
    Write-Host "4) Setup Google Cloud only"
    Write-Host "5) Exit"

    $choice = Read-Host "Enter your choice (1-5)"

    switch ($choice) {
        "1" {
            Write-Status "Running complete setup..."
            $migrationSuccess = Invoke-Migrations
            if ($migrationSuccess) {
                Deploy-Functions
                Set-GCloud
                New-SampleData
                Write-Success "Complete setup finished!"
            }
        }
        "2" {
            Deploy-Functions
        }
        "3" {
            Invoke-Migrations
        }
        "4" {
            Set-GCloud
        }
        "5" {
            Write-Status "Exiting..."
            exit 0
        }
        default {
            Write-Error "Invalid choice. Exiting..."
            exit 1
        }
    }

    Write-Host ""
    Write-Success "Setup completed! 🎉"
    Write-Host ""
    Write-Host "Next steps:"
    Write-Host "1. Update your .env file with actual credentials"
    Write-Host "2. Test the premium features in your application"
    Write-Host "3. Configure Stripe for payment processing"
    Write-Host "4. Set up monitoring and alerts"
}

# Run main function
Main
