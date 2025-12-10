# Cloud Run Deployment Guide for InterpreLab

## Prerequisites

1. **Google Cloud SDK installed**

   ```bash
   gcloud --version
   ```

2. **Authenticate with Google Cloud**

   ```bash
   gcloud auth login
   ```

3. **Set your project ID**

   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

4. **Enable required APIs**

   ```bash
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   gcloud services enable cloudbuild.googleapis.com
   ```

## Deployment Steps

### Option 1: Deploy with gcloud (Recommended)

```bash
# Deploy to Cloud Run (builds and deploys in one command)
gcloud run deploy interprelab \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars "NODE_ENV=production"
```

### Option 2: Build and Deploy Separately

```bash
# 1. Build the Docker image
docker build -t gcr.io/YOUR_PROJECT_ID/interprelab:latest .

# 2. Push to Google Container Registry
docker push gcr.io/YOUR_PROJECT_ID/interprelab:latest

# 3. Deploy to Cloud Run
gcloud run deploy interprelab \
  --image gcr.io/YOUR_PROJECT_ID/interprelab:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

### Option 3: Using Artifact Registry (Recommended for production)

```bash
# 1. Create Artifact Registry repository
gcloud artifacts repositories create interprelab-repo \
  --repository-format=docker \
  --location=us-central1 \
  --description="InterpreLab Docker repository"

# 2. Configure Docker authentication
gcloud auth configure-docker us-central1-docker.pkg.dev

# 3. Build and tag image
docker build -t us-central1-docker.pkg.dev/YOUR_PROJECT_ID/interprelab-repo/interprelab:latest .

# 4. Push to Artifact Registry
docker push us-central1-docker.pkg.dev/YOUR_PROJECT_ID/interprelab-repo/interprelab:latest

# 5. Deploy to Cloud Run
gcloud run deploy interprelab \
  --image us-central1-docker.pkg.dev/YOUR_PROJECT_ID/interprelab-repo/interprelab:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1
```

## Environment Variables

To set environment variables for your Cloud Run service:

```bash
gcloud run services update interprelab \
  --set-env-vars "VITE_SUPABASE_URL=your_supabase_url" \
  --set-env-vars "VITE_SUPABASE_ANON_KEY=your_supabase_key" \
  --set-env-vars "VITE_GEMINI_API_KEY=your_gemini_key"
```

Or use a `.env.yaml` file:

```yaml
VITE_SUPABASE_URL: "your_supabase_url"
VITE_SUPABASE_ANON_KEY: "your_supabase_key"
VITE_GEMINI_API_KEY: "your_gemini_key"
```

Then deploy with:

```bash
gcloud run deploy interprelab \
  --source . \
  --env-vars-file .env.yaml
```

## Custom Domain Setup

```bash
# 1. Map your domain
gcloud run domain-mappings create \
  --service interprelab \
  --domain your-domain.com \
  --region us-central1

# 2. Follow the instructions to update your DNS records
```

## Monitoring and Logs

```bash
# View logs
gcloud run services logs read interprelab --region us-central1

# Stream logs in real-time
gcloud run services logs tail interprelab --region us-central1
```

## Local Testing

Test the Docker image locally before deploying:

```bash
# Build the image
docker build -t interprelab-local .

# Run locally on port 8080
docker run -p 8080:8080 interprelab-local

# Visit http://localhost:8080
```

## CI/CD with Cloud Build

Create a `cloudbuild.yaml` file for automated deployments:

```yaml
steps:
  # Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/interprelab:$COMMIT_SHA', '.']
  
  # Push the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/interprelab:$COMMIT_SHA']
  
  # Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'interprelab'
      - '--image'
      - 'gcr.io/$PROJECT_ID/interprelab:$COMMIT_SHA'
      - '--region'
      - 'us-central1'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'

images:
  - 'gcr.io/$PROJECT_ID/interprelab:$COMMIT_SHA'
```

## Cost Optimization

- **Min instances**: Set to 0 for development (cold starts)
- **Max instances**: Limit based on expected traffic
- **Memory**: Start with 512Mi, adjust based on monitoring
- **CPU**: Use 1 CPU for most cases

## Troubleshooting

### Container fails to start

```bash
# Check logs
gcloud run services logs read interprelab --limit 50

# Describe the service
gcloud run services describe interprelab --region us-central1
```

### Build fails

```bash
# Test build locally
docker build -t test-build .

# Check build logs in Cloud Build
gcloud builds list --limit 5
```

## Security Best Practices

1. **Use Secret Manager** for sensitive environment variables
2. **Enable VPC connector** if accessing private resources
3. **Set up Cloud Armor** for DDoS protection
4. **Enable Cloud CDN** for static assets
5. **Use IAM** to control access to the service

## Additional Resources

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud Run Pricing](https://cloud.google.com/run/pricing)
- [Best Practices](https://cloud.google.com/run/docs/tips)
