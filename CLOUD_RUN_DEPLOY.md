# Deploying InterpreLab to Google Cloud Run

This guide will walk you through containerizing your React application and deploying it to Google Cloud Run.

## Prerequisites

-   **Docker:** Ensure Docker is installed and running on your local machine.
-   **Google Cloud SDK (`gcloud` CLI):** Ensure `gcloud` is installed and configured for your project (`interprelab-eco-landing-page`).
    -   You can verify your configuration with `gcloud config list`.
    -   If not configured, run `gcloud init`.

## Step 1: Create a Dockerfile

Create a file named `Dockerfile` in the root of your project (the same directory as `package.json`) with the following content:

```dockerfile
# Stage 1: Build the React application
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (optional, but good practice)
# If you have a custom nginx.conf, place it in your project root
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Explanation of the Dockerfile:**

-   **Stage 1 (builder):**
    -   Uses a Node.js Alpine image to keep the final image small.
    -   Sets the working directory to `/app`.
    -   Copies `package.json` and `bun.lockb` to install dependencies.
    -   Runs `bun install --frozen-lockfile` to install project dependencies.
    -   Copies the rest of your application code.
    -   Runs `bun run build` to create the optimized production build of your React app.

-   **Stage 2 (nginx):**
    -   Uses a lightweight Nginx Alpine image.
    -   Copies the static files generated in the `builder` stage (`/app/dist`) to the Nginx web server directory (`/usr/share/nginx/html`).
    -   Exposes port 80, which Nginx listens on by default.
    -   Starts Nginx in the foreground.

## Step 2: Build and Push the Docker Image

Open your terminal in the project root directory and run the following commands:

1.  **Configure Docker to use Google Cloud's credential helper:**

    ```bash
    gcloud auth configure-docker
    ```

2.  **Build the Docker image:**

    ```bash
    docker build -t gcr.io/interprelab-eco-landing-page/interprelab-frontend:latest .
    ```

3.  **Push the Docker image to Google Container Registry:**

    ```bash
    docker push gcr.io/interprelab-eco-landing-page/interprelab-frontend:latest
    ```

## Step 3: Deploy to Cloud Run

Now that your Docker image is in Google Container Registry, you can deploy it to Cloud Run:

```bash
gcloud run deploy interprelab-frontend \
  --image gcr.io/interprelab-eco-landing-page/interprelab-frontend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --project interprelab-eco-landing-page
```

After running this command, `gcloud` will provide you with the URL of your deployed service. You can access your application through this URL.
