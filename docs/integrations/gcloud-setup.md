# Google Cloud CLI (gcloud) Integration

## Installation
- Download and install from: https://cloud.google.com/sdk/docs/install
- On Windows, run the installer and follow prompts.
- After install, restart your terminal.

## Initialization
```sh
gcloud init
```
- Follow prompts to log in and set your default project.

## Common Commands
- Authenticate: `gcloud auth login`
- Set project: `gcloud config set project <PROJECT_ID>`
- Deploy to Cloud Run: `gcloud run deploy`

## Project Usage
- Used for deploying backend/edge functions and managing GCP resources.
- See `GCP_CLOUDRUN_DEPLOY.md` for deployment workflow.
