# Pre-Deployment Checklist for InterpreLab Microservices

## Before You Deploy

Run through this checklist to ensure smooth deployment:

### 1. Google Cloud Platform Setup

- [ ] GCP account with billing enabled
- [ ] `gcloud` CLI installed and updated
- [ ] Authenticated to GCP (`gcloud auth login`)
- [ ] Project created and selected

**Check your project**:

```bash
gcloud config get-value project
```

**Set project if needed**:

```bash
gcloud config set project YOUR_PROJECT_ID
```

### 2. Enable Required APIs

```bash
# Enable all required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable secretmanager.googleapis.com
```

### 3. Supabase Production Setup

- [ ] Production Supabase project created
- [ ] Supabase URL noted: `https://[project].supabase.co`
- [ ] Service Role Key copied (from Settings → API → service_role)
- [ ] Token blacklist table created (run migration)

**Create token_blacklist table**:

```sql
-- Run this in Supabase SQL editor
-- Or: supabase db push (if using local migrations)

CREATE TABLE IF NOT EXISTS token_blacklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token_hash TEXT NOT NULL UNIQUE,
  user_id TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  blacklisted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_token_blacklist_hash ON token_blacklist(token_hash);
CREATE INDEX IF NOT EXISTS idx_token_blacklist_expires ON token_blacklist(expires_at);
CREATE INDEX IF NOT EXISTS idx_token_blacklist_user ON token_blacklist(user_id);

ALTER TABLE token_blacklist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON token_blacklist
  FOR ALL TO service_role USING (true) WITH CHECK (true);
```

### 4. Generate Secrets

**JWT Secret** (64 characters recommended):

```powershell
# PowerShell - Generate secure random string
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

### 5. Create Secrets in Google Secret Manager

```bash
# Create JWT Secret
echo -n "YOUR_64_CHAR_JWT_SECRET_HERE" | gcloud secrets create JWT_SECRET --data-file=-

# Create Supabase Service Key
echo -n "YOUR_SUPABASE_SERVICE_ROLE_KEY" | gcloud secrets create SUPABASE_SERVICE_KEY --data-file=-

# Verify secrets
gcloud secrets list
```

### 6. Verify Local Builds

```bash
# Make sure all services build successfully
cd services/auth && npm run build && cd ../..
cd services/interprestudy && npm run build && cd ../..
cd services/interprebot && npm run build && cd ../..
cd services/interprecoach && npm run build && cd ../..
cd services/interpretrack && npm run build && cd ../..
cd services/interprehub && npm run build && cd ../..
```

### 7. Environment Variables

Note these for deployment:

- `SUPABASE_URL`: `https://[your-project].supabase.co`
- `ALLOWED_ORIGINS`: Your production domains (comma-separated)
  - Example: `https://interprelab.com,https://app.interprelab.com`

---

## Ready to Deploy?

Once all checklist items are complete:

### Option 1: Deploy All Services at Once

```powershell
# PowerShell
powershell -ExecutionPolicy Bypass -File deploy-all.ps1
```

```bash
# Bash
chmod +x deploy-all.sh
./deploy-all.sh
```

### Option 2: Deploy Services Individually

Follow the detailed steps in `DEPLOYMENT-GUIDE.md`

---

## Post-Deployment Verification

After deployment:

```bash
# List all services
gcloud run services list --region us-central1

# Test each service
curl https://auth-service-[hash].run.app/health
curl https://interprestudy-service-[hash].run.app

# View logs
gcloud run services logs tail auth-service --region us-central1
```

---

## If Something Goes Wrong

### Rollback

```bash
# List revisions
gcloud run revisions list --service SERVICE_NAME --region us-central1

# Rollback to previous
gcloud run services update-traffic SERVICE_NAME \
  --to-revisions REVISION_NAME=100 \
  --region us-central1
```

### Debug

```bash
# Check build logs
gcloud builds list --limit 5

# View specific build
gcloud builds log BUILD_ID

# Check service logs
gcloud run services logs tail SERVICE_NAME --region us-central1
```

---

## Estimated Costs

**Monthly Estimate** (light traffic):

- Cloud Run: $50-100
- Supabase: $0-25 (free tier initially)
- Domain: ~$1/month
- **Total**: ~$50-125/month

Cost scales with traffic. Set instance limits to control costs.

---

## Ready?

✅ All checklist items complete  
✅ Secrets created  
✅ Services built  

**→ Run `deploy-all.ps1` to begin deployment!**
