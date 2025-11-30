# Google Cloud Setup for Form Submissions

This document outlines the steps to connect your "Join the Waitlist" and "Get in Touch" forms to Google Cloud services to receive email notifications.

## Prerequisites

*   A Google Cloud Platform (GCP) project.
*   The `gcloud` CLI installed and authenticated.
*   An email address you want to send notifications from (e.g., using SendGrid or another email service).

## Step 1: Create a Cloud Function

We will create a Cloud Function that triggers on an HTTP request. This function will parse the form data and send an email.

1.  **Go to the Cloud Functions section** in your GCP console.
2.  **Click "Create Function"**.
3.  **Configure the function:**
    *   **Function name:** `send-form-email`
    *   **Region:** Select a region close to you.
    *   **Trigger type:** HTTP
    *   **Authentication:** Allow unauthenticated invocations (for now, we will secure it with API Gateway later).
4.  **Click "Next"** to go to the code section.
5.  **Select the runtime:** Node.js or Python are good choices.
6.  **Here is a sample Python code snippet** for the function. You will need to replace the placeholders with your actual data.

```python
import functions_framework
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# IMPORTANT: Store your SendGrid API Key in Secret Manager
# and access it securely.
SENDGRID_API_KEY = "YOUR_SENDGRID_API_KEY"
SENDER_EMAIL = "admin.ceo@interprelab.com"
RECIPIENT_EMAIL = "admin.ceo@interprelab.com"

@functions_framework.http
def send_form_email(request):
    request_json = request.get_json(silent=True)

    if not request_json or 'email' not in request_json:
        return 'Missing email in request', 400

    name = request_json.get('name', 'N/A')
    email = request_json.get('email')
    message_text = request_json.get('message', 'N/A')

    subject = f"New Form Submission from {name}"
    html_content = f"""
    <h3>New Form Submission</h3>
    <p><b>Name:</b> {name}</p>
    <p><b>Email:</b> {email}</p>
    <p><b>Message:</b></p>
    <p>{message_text}</p>
    """

    message = Mail(
        from_email=SENDER_EMAIL,
        to_emails=RECIPIENT_EMAIL,
        subject=subject,
        html_content=html_content)

    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        return 'Email sent successfully', 200
    except Exception as e:
        print(e)
        return 'Error sending email', 500
```

## Step 2: Update Frontend Code

You will need to update your React components to send a POST request to the Cloud Function's trigger URL.

Here is an example of how you can modify your form components:

```typescript
import { useState } from 'react';

// ... other imports

const MyForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('YOUR_CLOUD_FUNCTION_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      // Handle success (e.g., show a success message)
    } else {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form inputs */}
    </form>
  );
};
```

## Step 3: Secure your Function with API Gateway

To prevent unauthorized access to your Cloud Function, you should put it behind an API Gateway.

1.  **Go to the API Gateway section** in your GCP console.
2.  **Create a new API** and an API config that points to your Cloud Function.
3.  **Enable CORS** on your API Gateway to allow requests from your website's domain.
4.  **Consider adding an API key** for an extra layer of security.

By following these steps, you can securely receive email notifications for your form submissions.
