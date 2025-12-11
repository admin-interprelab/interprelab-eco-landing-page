# Auth Service

Centralized authentication service for the InterpreLab microservices architecture.

## Features

- JWT token generation and validation
- Supabase Auth integration
- Secure HTTP-only cookies
- Token blacklist for signout
- Token refresh mechanism
- CORS support for cross-service authentication

## Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure environment**:

   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Run in development**:

   ```bash
   npm run dev
   ```

## API Endpoints

### POST /api/auth/signin

Sign in with email and password.

**Request**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:

```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "authenticated"
  }
}
```

### POST /api/auth/signout

Sign out and revoke the current token.

**Response**:

```json
{
  "message": "Signed out successfully"
}
```

### GET /api/auth/validate

Validate the current authentication token.

**Response**:

```json
{
  "valid": true,
  "user": {
    "userId": "user-id",
    "email": "user@example.com",
    "roles": []
  }
}
```

### POST /api/auth/refresh

Refresh the authentication token.

**Response**:

```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "authenticated"
  }
}
```

### GET /health

Health check endpoint.

**Response**:

```json
{
  "status": "healthy",
  "service": "auth-service",
  "timestamp": "2025-12-11T07:56:08.000Z"
}
```

## Deployment

### Docker Build

```bash
docker build -t auth-service .
docker run -p 3006:3006 --env-file .env auth-service
```

### Google Cloud Run

```bash
gcloud builds submit --config cloudbuild.yaml
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 3006) |
| `NODE_ENV` | Environment | No (default: development) |
| `JWT_SECRET` | Secret for JWT signing | Yes |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_SERVICE_KEY` | Supabase service key | Yes |
| `ALLOWED_ORIGINS` | CORS allowed origins | Yes |

## Security

- JWT tokens expire after 7 days
- HTTP-only cookies prevent XSS attacks
- Secure flag enabled in production
- SameSite=Lax prevents CSRF
- Token blacklist prevents reuse after signout
- Minimum 32-character JWT secret required
