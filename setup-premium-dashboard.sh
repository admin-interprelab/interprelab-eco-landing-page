#!/bin/bash

# Premium Dashboard Setup Script
# This script sets up the complete premium dashboard infrastructure

echo "🚀 Setting up Premium Dashboard Infrastructure..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."

    if ! command -v supabase &> /dev/null; then
        print_error "Supabase CLI is not installed. Please install it first."
        exit 1
    fi

    if ! command -v gcloud &> /dev/null; then
        print_error "Google Cloud SDK is not installed. Please install it first."
        exit 1
    fi

    print_success "All requirements met!"
}

# Setup environment file
setup_environment() {
    print_status "Setting up environment configuration..."

    if [ ! -f .env ]; then
        if [ -f .env.example ]; then
            cp .env.example .env
            print_warning "Created .env file from .env.example. Please update with your actual credentials."
        else
            print_error ".env.example file not found. Please create it first."
            exit 1
        fi
    else
        print_warning ".env file already exists. Skipping creation."
    fi
}

# Deploy Supabase functions
deploy_functions() {
    print_status "Deploying Supabase Edge Functions..."

    # Check if Supabase is linked
    if ! supabase status &> /dev/null; then
        print_warning "Supabase project not linked. Please run 'supabase link' first."
        return 1
    fi

    # Deploy each function
    functions=("generate-earnings-projection" "calculate-performance-metrics" "sync-learning-data" "update-goal-progress")

    for func in "${functions[@]}"; do
        print_status "Deploying function: $func"
        if supabase functions deploy $func; then
            print_success "Deployed $func successfully"
        else
            print_error "Failed to deploy $func"
        fi
    done
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."

    if supabase db push; then
        print_success "Database migrations completed successfully"
    else
        print_error "Database migration failed"
        return 1
    fi
}

# Setup Google Cloud project
setup_gcloud() {
    print_status "Setting up Google Cloud integration..."

    # Check if user is authenticated
    if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | head -n 1 &> /dev/null; then
        print_warning "Not authenticated with Google Cloud. Please run 'gcloud auth login' first."
        return 1
    fi

    # Enable required APIs
    print_status "Enabling required Google Cloud APIs..."
    gcloud services enable aiplatform.googleapis.com
    gcloud services enable cloudfunctions.googleapis.com

    print_success "Google Cloud setup completed"
}

# Create sample data
create_sample_data() {
    print_status "Creating sample data..."

    # This would typically insert sample subscription plans, goals, etc.
    # For now, we'll just print a message
    print_warning "Sample data creation not implemented yet. Please add manually through Supabase dashboard."
}

# Main execution
main() {
    echo "🎯 Premium Dashboard Setup"
    echo "=========================="

    check_requirements
    setup_environment

    # Ask user what they want to do
    echo ""
    echo "What would you like to set up?"
    echo "1) Complete setup (recommended)"
    echo "2) Deploy Supabase functions only"
    echo "3) Run database migrations only"
    echo "4) Setup Google Cloud only"
    echo "5) Exit"

    read -p "Enter your choice (1-5): " choice

    case $choice in
        1)
            print_status "Running complete setup..."
            run_migrations
            deploy_functions
            setup_gcloud
            create_sample_data
            print_success "Complete setup finished!"
            ;;
        2)
            deploy_functions
            ;;
        3)
            run_migrations
            ;;
        4)
            setup_gcloud
            ;;
        5)
            print_status "Exiting..."
            exit 0
            ;;
        *)
            print_error "Invalid choice. Exiting..."
            exit 1
            ;;
    esac

    echo ""
    print_success "Setup completed! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Update your .env file with actual credentials"
    echo "2. Test the premium features in your application"
    echo "3. Configure Stripe for payment processing"
    echo "4. Set up monitoring and alerts"
}

# Run main function
main "$@"
