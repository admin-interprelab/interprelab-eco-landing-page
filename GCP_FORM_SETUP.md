# Google Cloud Platform Form Setup for InterpreLab

This guide will walk you through setting up a serverless backend on Google Cloud Platform (GCP) to handle form submissions from your React application. When a user submits the "Join the Waitlist" or "Get in Touch" form, this backend will send an email notification to `admin.ceo@interprelab.com`.

## Prerequisites

- A Google Cloud Platform account with billing enabled.
- `gcloud` CLI installed and authenticated.
- A SendGrid account (a free account is sufficient for this purpose).

## Step 1: Create a new Google Cloud Project

If you don't have one already, create a new GCP project. You can do this from the [GCP Console](https://console.cloud.google.com/).

## Step 2: Enable APIs

Enable the Cloud Functions API and the Secret Manager API for your project.

```bash
gcloud services enable cloudfunctions.googleapis.com secretmanager.googleapis.com
```

## Step 3: Create a SendGrid API Key

1.  Log in to your SendGrid account.
2.  Navigate to **Settings > API Keys**.
3.  Click **Create API Key**.
4.  Give your API key a name (e.g., `interprelab-form-handler`).
5.  Choose **Full Access** for the permissions.
6.  Click **Create & View**.
7.  **Important:** Copy the API key and save it somewhere safe. You will not be able to see it again.

## Step 4: Store the SendGrid API Key in Secret Manager

1.  Create a new secret in Secret Manager:

    ```bash
    gcloud secrets create sendgrid-api-key --replication-policy="automatic"
    ```

2.  Add the API key you just created as a secret version:

    ```bash
    echo -n "YOUR_SENDGRID_API_KEY" | gcloud secrets versions add sendgrid-api-key --data-file=-
    ```

    Replace `YOUR_SENDGRID_API_KEY` with the key you copied from SendGrid.

## Step 5: Create the Cloud Function

1.  Create a new directory for your function and navigate into it:

    ```bash
    mkdir form-handler
    cd form-handler
    ```

2.  Create a `main.py` file with the following code:

    ```python
    import os
    from sendgrid import SendGridAPIClient
    from sendgrid.helpers.mail import Mail

    def handle_form(request):
        """Responds to any HTTP request.
        Args:
            request (flask.Request): HTTP request object.
        Returns:
            The response text or any set of values that can be turned into a
            Response object using
            `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
        """
        # Set CORS headers for the preflight request
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

        request_json = request.get_json()

        from_email = 'admin.ceo@interprelab.com'
        to_email = 'admin.ceo@interprelab.com'
        subject = 'New Form Submission'
        
        if 'name' in request_json and 'email' in request_json:
            name = request_json['name']
            email = request_json['email']
            message_content = f'Name: {name}<br>Email: {email}'

            if 'message' in request_json:
                message = request_json['message']
                message_content += f'<br>Message: {message}'
                subject = 'New "Get in Touch" Submission'
            else:
                subject = 'New "Join Waitlist" Submission'

            message = Mail(
                from_email=from_email,
                to_emails=to_email,
                subject=subject,
                html_content=message_content)
            try:
                sendgrid_api_key = os.environ.get('SENDGRID_API_KEY')
                sg = SendGridAPIClient(sendgrid_api_key)
                response = sg.send(message)
                return ('Email sent.', 200, headers)
            except Exception as e:
                print(e)
                return ('Error sending email.', 500, headers)
        else:
            return ('Invalid request', 400, headers)

    ```

3.  Create a `requirements.txt` file:

    ```
sendgrid>=6.0.0
Flask>=2.0.0
gunicorn>=20.0.0
```

4.  Deploy the function:

    ```bash
gcloud functions deploy form-handler \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point handle_form \
  --set-env-vars SENDGRID_API_KEY=projects/YOUR_PROJECT_ID/secrets/sendgrid-api-key/versions/latest
```

    Replace `YOUR_PROJECT_ID` with your GCP project ID.

    This command will give you a trigger URL. Copy it.

## Step 6: Update the React Forms

Now you need to update your React forms to send a POST request to the trigger URL you just copied.

Here is an example of how you can modify the `InterpreCoach.tsx` and `GetInTouch.tsx` files.

You can use a library like `axios` to make the POST request.

First, install axios:
```bash
npm install axios
```

Then, in `InterpreCoach.tsx` and `GetInTouch.tsx`, you can create a `handleSubmit` function:

```typescriptreact
import axios from 'axios';

// ... inside your component

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await axios.post('YOUR_CLOUD_FUNCTION_URL', data);
    console.log(response);
    // Handle success (e.g., show a success message)
  } catch (error) {
    console.error(error);
    // Handle error (e.g., show an error message)
  }
};

// ... in your form element
<form onSubmit={handleSubmit}>
  // ... your form inputs
</form>
```

Replace `YOUR_CLOUD_FUNCTION_URL` with the trigger URL of your Cloud Function.

You will need to update the `Input` and `Textarea` components to have a `name` attribute so that `FormData` can pick them up.

For example:
`<Input id="name" name="name" type="text" placeholder="John Doe" />`

```