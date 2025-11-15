# Deploying to Google Cloud Run

This guide provides instructions for deploying the InterpreLab application to Google Cloud Run, mapping a custom domain, and setting up a CI/CD pipeline with GitHub Actions.

## Prerequisites

1.  **Google Cloud Project:** You need a Google Cloud project with billing enabled.
2.  **gcloud CLI:** The Google Cloud CLI must be installed and authenticated.
3.  **Docker:** Docker must be installed on your local machine.
4.  **Domain:** You need to own the domain you want to use (e.g., `interprelab.com`).

## Step 1: Build and Push the Docker Image

1.  **Enable APIs:** Enable the Cloud Build, Cloud Run, Artifact Registry, and Secret Manager APIs in your Google Cloud project.

2.  **Create an Artifact Registry Repository:**
    ```bash
    gcloud artifacts repositories create interprelab-repo \
        --repository-format=docker \
        --location=us-central1 \
        --description="InterpreLab Docker repository"
    ```

3.  **Store Secrets in Secret Manager:**
    Create secrets for your Supabase URL and key.
    ```bash
    echo "your-supabase-url" | gcloud secrets create VITE_SUPABASE_URL --data-file=-
    echo "your-supabase-key" | gcloud secrets create VITE_SUPABASE_PUBLISHABLE_KEY --data-file=-
    ```
    If the secrets already exist, you can update them by adding a new version:
    ```bash
    echo "your-supabase-url" | gcloud secrets versions add VITE_SUPABASE_URL --data-file=-
    echo "your-supabase-key" | gcloud secrets versions add VITE_SUPABASE_PUBLISHABLE_KEY --data-file=-
    ```

4.  **Grant Permissions:**
    Grant the necessary permissions to the service accounts.
    The Cloud Build service account needs permissions to access secrets and run builds.
    In some environments, the Compute Engine default service account may also need permissions.
    ```bash
    # Grant permissions to the Cloud Build service account
    gcloud projects add-iam-policy-binding <PROJECT_ID> \
        --member="serviceAccount:$(gcloud projects describe <PROJECT_ID> --format='value(projectNumber)')@cloudbuild.gserviceaccount.com" \
        --role="roles/secretmanager.secretAccessor"

    gcloud projects add-iam-policy-binding <PROJECT_ID> \
        --member="serviceAccount:$(gcloud projects describe <PROJECT_ID> --format='value(projectNumber)')@cloudbuild.gserviceaccount.com" \
        --role="roles/cloudbuild.builds.builder"

    # Grant permissions to the Compute Engine default service account (if needed)
    gcloud projects add-iam-policy-binding <PROJECT_ID> \
        --member="serviceAccount:$(gcloud projects describe <PROJECT_ID> --format='value(projectNumber)')-compute@developer.gserviceaccount.com" \
        --role="roles/cloudbuild.builds.builder"
    ```

5.  **Build the Docker Image:** From the root of the project, build the image using Cloud Build. This will build the image and push it to your Artifact Registry. Replace `<PROJECT_ID>` with your Google Cloud project ID.

    Create a `cloudbuild.yaml` file in the root of your project with the following content:
    ```yaml
    steps:
    - name: 'gcr.io/cloud-builders/docker'
      args:
      - 'build'
      - '--network=cloudbuild'
      - '--tag=us-central1-docker.pkg.dev/$PROJECT_ID/interprelab-repo/interprelab-eco-landing-page'
      - '--build-arg'
      - 'VITE_SUPABASE_URL=$$VITE_SUPABASE_URL'
      - '--build-arg'
      - 'VITE_SUPABASE_PUBLISHABLE_KEY=$$VITE_SUPABASE_PUBLISHABLE_KEY'
      - '.'
      secretEnv:
      - 'VITE_SUPABASE_URL'
      - 'VITE_SUPABASE_PUBLISHABLE_KEY'
    images:
    - 'us-central1-docker.pkg.dev/$PROJECT_ID/interprelab-repo/interprelab-eco-landing-page'
    availableSecrets:
      secretManager:
      - versionName: projects/$PROJECT_ID/secrets/VITE_SUPABASE_URL/versions/latest
        env: 'VITE_SUPABASE_URL'
      - versionName: projects/$PROJECT_ID/secrets/VITE_SUPABASE_PUBLISHABLE_KEY/versions/latest
        env: 'VITE_SUPABASE_PUBLISHABLE_KEY'
    ```

    Then run the build:
    ```bash
    gcloud builds submit --config cloudbuild.yaml .
    ```

## Step 2: Deploy to Cloud Run

1.  **Deploy the Image:** Deploy the image to Cloud Run. This command will create a new service. Replace `<PROJECT_ID>` with your Google Cloud project ID.

    ```bash
    gcloud run deploy interprelab-eco-landing-page \
        --image us-central1-docker.pkg.dev/<PROJECT_ID>/interprelab-repo/interprelab-eco-landing-page \
        --platform managed \
        --region us-central1 \
        --allow-unauthenticated
    ```
    When prompted, allow unauthenticated invocations. Note the URL of your service after deployment.

## Step 3: Map a Custom Domain

1.  **Verify Domain Ownership:** If you haven't already, you need to verify that you own your domain with Google.

2.  **Map the Domain:** Map your Cloud Run service to your custom domain.

    ```bash
    gcloud run domain-mappings create \
        --service interprelab-eco-landing-page \
        --domain interprelab.com \
        --region us-central1
    ```

3.  **Update DNS Records:** After running the command, you will be provided with DNS records to add to your domain's DNS configuration.

## Step 4: Set up CI/CD with GitHub Actions

1.  **Create a Service Account:** Create a service account for GitHub Actions to use.

    ```bash
    gcloud iam service-accounts create github-actions-deployer \
        --description="Service account for GitHub Actions" \
        --display-name="GitHub Actions Deployer"
    ```

2.  **Grant Permissions:** Grant the service account the necessary roles to build and deploy.

    ```bash
    gcloud projects add-iam-policy-binding <PROJECT_ID> \
        --member="serviceAccount:github-actions-deployer@<PROJECT_ID>.iam.gserviceaccount.com" \
        --role="roles/run.admin"

    gcloud projects add-iam-policy-binding <PROJECT_ID> \
        --member="serviceAccount:github-actions-deployer@<PROJECT_ID>.iam.gserviceaccount.com" \
        --role="roles/iam.serviceAccountUser"

    gcloud projects add-iam-policy-binding <PROJECT_ID> \
        --member="serviceAccount:github-actions-deployer@<PROJECT_ID>.iam.gserviceaccount.com" \
        --role="roles/cloudbuild.builds.builder"
    ```

3.  **Create a Service Account Key:** Create a JSON key for the service account.

    ```bash
    gcloud iam service-accounts keys create github-actions-key.json \
        --iam-account="github-actions-deployer@<PROJECT_ID>.iam.gserviceaccount.com"
    ```

4.  **Add Secrets to GitHub:** In your GitHub repository, go to `Settings > Secrets and variables > Actions` and add the following secrets:
    *   `GCP_PROJECT_ID`: Your Google Cloud project ID.
    *   `GCP_SA_KEY`: The content of the `github-actions-key.json` file.

5.  **Create a GitHub Actions Workflow:** Create a file at `.github/workflows/deploy.yml` with the following content:

    ```yaml
    name: Build and Deploy to Cloud Run

    on:
      push:
        branches:
          - main

    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout
            uses: actions/checkout@v3

          - name: Authenticate to Google Cloud
            uses: google-github-actions/auth@v1
            with:
              credentials_json: '${{ secrets.GCP_SA_KEY }}'

          - name: Set up Cloud SDK
            uses: google-github-actions/setup-gcloud@v1

          - name: Build and Push Docker Image
            run: |-
              gcloud builds submit --config cloudbuild.yaml .

          - name: Deploy to Cloud Run
            run: |-
              gcloud run deploy interprelab-eco-landing-page \
                --image us-central1-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/interprelab-repo/interprelab-eco-landing-page \
                --platform managed \
                --region us-central1 \
                --allow-unauthenticated
    ```

Now, every time you push to the `main` branch, GitHub Actions will automatically build and deploy your application to Cloud Run.
