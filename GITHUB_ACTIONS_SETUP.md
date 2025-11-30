# GitHub Actions Auto-Deployment Setup

This guide will set up automatic deployment to Google Cloud Run whenever you push to the main branch.

## 🔧 **Step 1: Create Google Cloud Service Account**

### **1.1 Create Service Account**
```bash
# Create service account
gcloud iam service-accounts create github-actions \
    --description="Service account for GitHub Actions" \
    --display-name="GitHub Actions"

# Get your project ID
export PROJECT_ID="interprelab-eco-landing-page"

# Grant necessary roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"
```

### **1.2 Create Service Account Key**
```bash
# Create and download key
gcloud iam service-accounts keys create key.json \
    --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com

# Display the key content (copy this for GitHub secrets)
cat key.json
```

## 🔐 **Step 2: Configure GitHub Secrets**

Go to your GitHub repository → Settings → Secrets and variables → Actions

### **Required Secrets:**

1. **GCP_SA_KEY**
   - Value: The entire content of the `key.json` file from Step 1.2

2. **VITE_SUPABASE_URL**
   - Value: `https://iokgkrnbawhizmuejluz.supabase.co`

3. **VITE_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlva2drcm5iYXdoaXptdWVqbHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2Mjg5ODcsImV4cCI6MjA3NzIwNDk4N30.GTIKRwPUu44PA209OFLj1WaEEGgKwbBaO0iTc7P-UtY`

### **How to Add Secrets:**
1. Go to `https://github.com/YOUR_USERNAME/interprelab-eco-landing-page/settings/secrets/actions`
2. Click "New repository secret"
3. Add each secret with the exact name and value above

## 🚀 **Step 3: Test the Deployment**

### **3.1 Commit and Push**
```bash
# Add the workflow file
git add .github/workflows/deploy.yml
git add GITHUB_ACTIONS_SETUP.md
git commit -m "Add GitHub Actions auto-deployment"
git push origin main
```

### **3.2 Monitor Deployment**
1. Go to your GitHub repository
2. Click on "Actions" tab
3. Watch the deployment progress
4. Check the logs for any issues

## 📋 **What Happens on Each Commit:**

1. **Trigger**: Push to `main` or `master` branch
2. **Build**: Install dependencies and build the app
3. **Test**: Run tests (continues even if tests fail)
4. **Docker**: Build optimized Docker image
5. **Deploy**: Push to Google Cloud Run
6. **Update**: Your app at `https://app.interprelab.com` updates automatically

## 🔍 **Monitoring & Logs**

### **GitHub Actions Logs**
- View deployment status in GitHub Actions tab
- See detailed logs for each step
- Get notified of deployment failures

### **Google Cloud Logs**
```bash
# View service logs
gcloud run services logs tail interprelab-app --region=us-central1

# View recent deployments
gcloud run revisions list --service=interprelab-app --region=us-central1
```

## 🛠️ **Troubleshooting**

### **Common Issues:**

**1. Authentication Failed**
- Check that `GCP_SA_KEY` secret is correctly formatted
- Ensure service account has proper permissions

**2. Build Failed**
- Check Node.js version compatibility
- Verify all dependencies are in package.json

**3. Deployment Failed**
- Check Google Cloud quotas
- Verify project ID and region settings

### **Debug Commands:**
```bash
# Check service account permissions
gcloud projects get-iam-policy interprelab-eco-landing-page

# Test local build
npm ci && npm run build

# Test Docker build locally
docker build -f Dockerfile.optimized -t test-image .
```

## 🎯 **Benefits of Auto-Deployment**

✅ **Instant Updates**: Changes go live within 5-10 minutes
✅ **Zero Downtime**: Rolling deployments with no service interruption
✅ **Automatic Rollback**: Easy to revert if issues occur
✅ **Build Validation**: Catches errors before deployment
✅ **Consistent Environment**: Same build process every time

## 🔄 **Workflow Summary**

```
Code Change → Git Push → GitHub Actions → Build → Test → Deploy → Live Site
     ↓              ↓            ↓          ↓       ↓        ↓         ↓
  Local Dev    Trigger CI    Install    Build   Docker   Cloud Run  Users
```

Your InterpreLab app will now automatically deploy to `https://app.interprelab.com` every time you push changes to the main branch! 🎉
