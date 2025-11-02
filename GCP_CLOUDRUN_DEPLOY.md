# Google Cloud Run Deployment Guide

## ✅ Current Status

Your InterpreLab application is successfully deployed to Google Cloud Run!

- **Project ID**: `interprelab-eco-landing-page`
- **Service Name**: `interprelab-app`
- **Region**: `us-central1`
- **Service URL**: https://interprelab-app-293419676967.us-central1.run.app
- **Docker Image**: `gcr.io/interprelab-eco-landing-page/interprelab-app:latest`

## 🚀 Automatic Deployment Setup

### Current Configuration
- ✅ Docker image built and pushed to Google Container Registry
- ✅ Cloud Run service deployed and running
- ✅ GitHub Actions workflow configured for auto-deployment
- ✅ Dockerfile optimized for production with nginx

### Deployment Workflow
Every commit to the `main` branch triggers:
1. **Build**: Install dependencies and build React app
2. **Test**: Run test suite (continues on failure)
3. **Docker**: Build optimized Docker image with nginx
4. **Push**: Upload image to Google Container Registry
5. **Deploy**: Update Cloud Run service with new image
6. **Verify**: Service automatically starts serving traffic

## 🔧 Manual Deployment Commands

### Build and Deploy Locally
```bash
# Build Docker image
docker build -t gcr.io/interprelab-eco-landing-page/interprelab-app:latest .

# Push to registry
docker push gcr.io/interprelab-eco-landing-page/interprelab-app:latest

# Deploy to Cloud Run
gcloud run deploy interprelab-app \
  --image=gcr.io/interprelab-eco-landing-page/interprelab-app:latest \
  --region=us-central1 \
  --platform=managed \
  --allow-unauthenticated \
  --port=8080 \
  --memory=1Gi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10 \
  --concurrency=80 \
  --timeout=300
```

### Service Management
```bash
# Check service status
gcloud run services describe interprelab-app --region=us-central1

# View service logs
gcloud run services logs tail interprelab-app --region=us-central1

# List all revisions
gcloud run revisions list --service=interprelab-app --region=us-central1

# Scale service
gcloud run services update interprelab-app \
  --region=us-central1 \
  --min-instances=1 \
  --max-instances=20
```

## 🔐 Required GitHub Secrets

For automatic deployment, ensure these secrets are set in GitHub:

1. **GCP_SA_KEY**: Service account JSON key for authentication
2. **VITE_SUPABASE_URL**: Supabase project URL
3. **VITE_SUPABASE_ANON_KEY**: Supabase anonymous key

## 📊 Service Configuration

### Current Settings
- **Memory**: 1GB
- **CPU**: 1 vCPU
- **Min Instances**: 0 (scales to zero)
- **Max Instances**: 10
- **Concurrency**: 80 requests per instance
- **Timeout**: 300 seconds
- **Port**: 8080

### Environment Variables
- `NODE_ENV=production`
- `VITE_SUPABASE_URL` (from GitHub secret)
- `VITE_SUPABASE_ANON_KEY` (from GitHub secret)
- `VITE_GOOGLE_CLOUD_PROJECT_ID=interprelab-eco-landing-page`

## 🌐 Custom Domain Setup

To use `app.interprelab.com`:

1. **Map Domain**:
```bash
gcloud run domain-mappings create \
  --service=interprelab-app \
  --domain=app.interprelab.com \
  --region=us-central1
```

2. **Update DNS**: Add the provided DNS records to your domain registrar

## 📈 Monitoring & Logs

### Cloud Console
- **Service**: https://console.cloud.google.com/run/detail/us-central1/interprelab-app
- **Logs**: https://console.cloud.google.com/logs/query
- **Metrics**: Built-in request metrics, latency, and error rates

### Health Check
The Docker image includes a health check endpoint at `/health`

## 🔄 Rollback Process

If you need to rollback to a previous version:

```bash
# List revisions
gcloud run revisions list --service=interprelab-app --region=us-central1

# Rollback to specific revision
gcloud run services update-traffic interprelab-app \
  --to-revisions=REVISION_NAME=100 \
  --region=us-central1
```

## 🛡️ Security Features

- ✅ Non-root user in container
- ✅ Minimal Alpine Linux base image
- ✅ HTTPS enforced by Cloud Run
- ✅ IAM-based access control
- ✅ Container image vulnerability scanning

## 💰 Cost Optimization

- **Pay-per-use**: Only charged when serving requests
- **Scale-to-zero**: No cost when idle
- **Efficient caching**: nginx serves static assets efficiently
- **Optimized build**: Multi-stage Docker build reduces image size

Your InterpreLab application is now fully deployed and will automatically update with every code change! 🎉
