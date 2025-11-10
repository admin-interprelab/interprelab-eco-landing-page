# Google Cloud AI Glossary Backend Setup

This guide details how to set up a serverless backend on Google Cloud Platform (GCP) to provide AI-powered definitions for your glossary feature. This function will use the Gemini Pro model via the Vertex AI API to look up medical terms.

## Prerequisites

- A Google Cloud Platform account with billing enabled.
- `gcloud` CLI installed and authenticated.
- Your Google Cloud Project ID.

## Step 1: Enable Required APIs

Enable the Cloud Functions API, Secret Manager API, and Vertex AI API for your project.

```bash
gcloud services enable cloudfunctions.googleapis.com secretmanager.googleapis.com aiplatform.googleapis.com
```

## Step 2: Store Your Google AI API Key in Secret Manager

Storing your API key in Secret Manager is a security best practice.

1.  Create a new secret to hold your API key:

    ```bash
    gcloud secrets create google-ai-api-key --replication-policy="automatic"
    ```

2.  Add your API key as a secret version. Replace `YOUR_GOOGLE_AI_API_KEY` with your actual key.

    ```bash
    echo -n "YOUR_GOOGLE_AI_API_KEY" | gcloud secrets versions add google-ai-api-key --data-file=-
    ```

## Step 3: Create the Cloud Function

This function will handle HTTP requests, call the Gemini API, and return a structured JSON response.

1.  Create a new directory for your function:

    ```bash
    mkdir glossary-handler
    cd glossary-handler
    ```

2.  Create a `main.py` file with the following code:

    ```python
    import os
    import json
    import vertexai
    from vertexai.generative_models import GenerativeModel

    # Initialize Vertex AI
    PROJECT_ID = os.environ.get('GCP_PROJECT')
    LOCATION = "us-central1" # Or any other supported region
    vertexai.init(project=PROJECT_ID, location=LOCATION)

    def lookup_term(request):
        """
        HTTP Cloud Function to look up a medical term using Gemini.
        """
        # Set CORS headers for preflight requests
        if request.method == 'OPTIONS':
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600'
            }
            return ('', 204, headers)

        # Set CORS headers for the main request
        headers = {
            'Access-Control-Allow-Origin': '*'
        }

        request_json = request.get_json(silent=True)
        if not request_json or 'term' not in request_json:
            return ('Missing "term" in request body', 400, headers)

        term = request_json['term']

        # Initialize the Gemini model
        model = GenerativeModel("gemini-1.0-pro")

        # Create a prompt for the model
        prompt = f"""
        You are a helpful medical terminology assistant for interpreters.
        For the medical term "{term}", provide a response in JSON format with the following keys:
        - "definition": A clear and concise definition suitable for an interpreter.
        - "pronunciation": A simple phonetic spelling of the term.
        - "example": A short, practical sentence using the term in a medical context.

        Example for "Myocardial Infarction":
        {{
          "definition": "Death of heart muscle due to insufficient blood supply, commonly known as a heart attack.",
          "pronunciation": "my-oh-KAR-dee-al in-FARK-shun",
          "example": "The patient's EKG confirmed a myocardial infarction, and he was rushed to the cath lab."
        }}

        Now, provide the JSON for the term "{term}":
        """

        try:
            response = model.generate_content(prompt)
            # Clean up the response to get valid JSON
            cleaned_response = response.text.strip().replace('```json', '').replace('```', '').strip()
            term_data = json.loads(cleaned_response)
            return (json.dumps(term_data), 200, headers)
        except Exception as e:
            print(f"Error processing term '{term}': {e}")
            error_response = {"error": "Failed to look up term. Please try again."}
            return (json.dumps(error_response), 500, headers)

    ```

3.  Create a `requirements.txt` file:

    ```
    google-cloud-aiplatform>=1.38.0
    ```

4.  Deploy the function. Replace `YOUR_PROJECT_ID` with your actual GCP Project ID.

    ```bash
    gcloud functions deploy glossary-handler \
      --gen2 \
      --runtime python311 \
      --region us-central1 \
      --trigger-http \
      --allow-unauthenticated \
      --entry-point lookup_term \
      --set-secrets="GOOGLE_AI_API_KEY=google-ai-api-key:latest"
    ```

After deployment, `gcloud` will provide a trigger URL. You can now call this URL from your `MedicalGlossary.tsx` component to fetch definitions dynamically instead of using the mock data.

This setup provides a scalable and secure way to integrate powerful AI capabilities directly into your study tools!
