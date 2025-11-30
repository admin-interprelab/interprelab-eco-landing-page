# InterpreLab Domain Strategy & Deployment Plan

## 🎯 **Current Situation**
- **Two Cloud Run services**: `interprelab-app` and `interprelab-frontend`
- **App deployment errors**: Nginx permission issues
- **Domain confusion**: Need clear separation between marketing and app

## 🏗️ **Proposed Architecture**

### **Single Repository, Dual Purpose**
```
interprelab-eco-landing-page (this repo)
├── Marketing Pages (Public)
│   ├── / (Index) - Landing page
│   ├── /about - Company info
│   ├── /contact - Contact form
│   ├── /careers - Job listings
│   └── /resources - Public resources
│
└── Application Pages (Protected/Interactive)
    ├── /dashboard - User dashboard
    ├── /interprebot - AI assessment
    ├── /interprecoach - Coaching tools
    ├── /interprestudy - Study materials
    ├── /interpretrack - Progress tracking
    └── /settings - User settings
```

### **Domain Mapping Strategy**

#### **Option 1: Single Domain (Recommended)**
- **interprelab.com** - Everything (marketing + app)
- **Benefits**: Simpler, unified experience, better SEO
- **Implementation**: Current setup with proper routing

#### **Option 2: Subdomain Split**
- **interprelab.com** - Marketing pages only
- **app.interprelab.com** - Application pages only
- **Benefits**: Clear separation, different deployment strategies
- **Implementation**: Route splitting in nginx

## 🔧 **Immediate Fixes Needed**

### **1. Fix Current App Deployment**
```bash
# Rebuild with fixed nginx config
docker build -t gcr.io/interprelab-eco-landing-page/interprelab-app:latest .
docker push gcr.io/interprelab-eco-landing-page/interprelab-app:latest

# Redeploy
gcloud run deploy interprelab-app \
  --image=gcr.io/interprelab-eco-landing-page/interprelab-app:latest \
  --region=us-central1
```

### **2. Clean Up Duplicate Services**
```bash
# List current services
gcloud run services list --region=us-central1

# Delete old service (if needed)
gcloud run services delete interprelab-frontend --region=us-central1
```

### **3. Update Domain Mappings**
```bash
# Check current mappings
gcloud beta run domain-mappings list --region=us-central1

# Update if needed
gcloud beta run domain-mappings create \
  --service=interprelab-app \
  --domain=interprelab.com \
  --region=us-central1
```

## 🚀 **Recommended Implementation Plan**

### **Phase 1: Fix Current Deployment (Immediate)**
1. ✅ Fix nginx configuration (done)
2. ✅ Update Dockerfile (done)
3. 🔄 Rebuild and redeploy
4. 🔄 Test app.interprelab.com

### **Phase 2: Unified Domain Strategy**
1. **Decision**: Use single domain (interprelab.com) for everything
2. **Benefits**:
   - Simpler user experience
   - Better SEO (single domain authority)
   - Easier maintenance
   - Unified analytics

### **Phase 3: Marketing Optimization**
1. **Landing page optimization** (current Index.tsx is good)
2. **SEO improvements** (meta tags, structured data)
3. **Performance optimization** (already done with nginx)
4. **Analytics integration** (Google Analytics, etc.)

## 📊 **Current Page Analysis**

### **Marketing Pages (Public)**
- ✅ **Index** - Great landing page with hero, features, stats
- ✅ **About** - Company story, team, values
- ✅ **Contact** - Contact form with Supabase integration
- ✅ **Careers** - Job opportunities
- ✅ **Resources** - Training materials, industry resources

### **Application Pages (Interactive)**
- ✅ **Dashboard** - User analytics and overview
- ✅ **InterpreBot** - AI-powered assessment
- ✅ **InterpreCoach** - Coaching and training
- ✅ **InterpreStudy** - Study materials and practice
- ✅ **InterpreTrack** - Progress tracking
- ✅ **Settings** - User preferences

## 🎯 **Recommended Next Steps**

### **Immediate (Today)**
1. **Fix deployment errors**:
   ```bash
   # Rebuild with fixed config
   docker build -t gcr.io/interprelab-eco-landing-page/interprelab-app:latest .
   docker push gcr.io/interprelab-eco-landing-page/interprelab-app:latest
   gcloud run deploy interprelab-app --image=gcr.io/interprelab-eco-landing-page/interprelab-app:latest --region=us-central1
   ```

2. **Test the deployment**:
   - Visit the Cloud Run URL
   - Test app.interprelab.com
   - Verify all pages work

### **Short Term (This Week)**
1. **Set up main domain**:
   ```bash
   # Map main domain to the app
   gcloud beta run domain-mappings create \
     --service=interprelab-app \
     --domain=interprelab.com \
     --region=us-central1
   ```

2. **Update DNS**:
   - Add CNAME for interprelab.com → ghs.googlehosted.com
   - Keep app.interprelab.com as backup

3. **Enable auto-deployment**:
   - Set up GitHub Actions (already done)
   - Configure secrets
   - Test automatic deployment

### **Medium Term (Next Month)**
1. **SEO optimization**
2. **Analytics integration**
3. **Performance monitoring**
4. **User feedback collection**

## 🔍 **Testing Checklist**

### **After Deployment Fix**
- [ ] Cloud Run service starts without errors
- [ ] Nginx serves files correctly
- [ ] All routes work (/, /about, /dashboard, etc.)
- [ ] Authentication works
- [ ] Supabase integration works
- [ ] Forms submit correctly

### **After Domain Setup**
- [ ] interprelab.com loads correctly
- [ ] app.interprelab.com works (if keeping subdomain)
- [ ] SSL certificates are valid
- [ ] All internal links work
- [ ] SEO meta tags are correct

## 💡 **Recommendation**

**Use single domain (interprelab.com) for everything** because:
1. **Better user experience** - No confusion about where to go
2. **Better SEO** - Single domain authority
3. **Simpler maintenance** - One deployment, one domain
4. **Cost effective** - One SSL cert, one domain mapping
5. **Professional appearance** - Clean, unified brand

The current repo structure already supports this perfectly!
