# InterpreLab Eco Landing Page

## Project Status (as of November 15, 2025)

This repository contains the latest, consolidated version of the InterpreLab Eco landing page, featuring:

- **InterpreLink**: Community and resource hub (formerly InterpreHub)
- **InterpreWellness**: Therapeutic and wellness analytics features
- **InterpreStudy**: Training and study modules
- **Video Hero Section**: Landing page with three pain-point videos (public CDN)
- **Optimized Navigation & Routing**: All references updated to InterpreLink, `/interpre-hub` redirects to `/interprelink`
- **Therapeutic Analytics**: Context and services for A/B testing and analytics

All features are present, navigation and routing are up-to-date, and the codebase is committed and pushed to `main`.

---

## Next Steps: Docker Image & Google Cloud Run Deployment

### 1. Build Docker Image

1. Ensure Docker is installed and running.
2. From the project root, build the Docker image:
   ```bash
   docker build -t interprelab-eco-landing-page:latest .
   ```
3. (Optional) Test locally:
   ```bash
   docker run -p 3000:3000 interprelab-eco-landing-page:latest
   ```

### 2. Push Docker Image to Google Container Registry (GCR)

1. Authenticate with Google Cloud:
   ```bash
   gcloud auth login
   gcloud config set project <YOUR_GCP_PROJECT_ID>
   ```
2. Tag the image for GCR:
   ```bash
   docker tag interprelab-eco-landing-page:latest gcr.io/<YOUR_GCP_PROJECT_ID>/interprelab-eco-landing-page:latest
   ```
3. Push the image:
   ```bash
   docker push gcr.io/<YOUR_GCP_PROJECT_ID>/interprelab-eco-landing-page:latest
   ```

### 3. Deploy to Google Cloud Run

1. Enable Cloud Run API:
   ```bash
   gcloud services enable run.googleapis.com
   ```
2. Deploy the container:
   ```bash
   gcloud run deploy interprelab-eco-landing-page \
     --image gcr.io/interprelab-eco-landing-page/interprelab-eco-landing-page:latest \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```
3. After deployment, set the custom domain (interprelab.com) via Cloud Run console or CLI:
   - [Cloud Run Custom Domains Guide](https://cloud.google.com/run/docs/mapping-custom-domains)

---

## Useful References
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Cloud Run Custom Domains](https://cloud.google.com/run/docs/mapping-custom-domains)

---

## Contact & Support
For issues or questions, please open an issue in this repository or contact the InterpreLab team.
