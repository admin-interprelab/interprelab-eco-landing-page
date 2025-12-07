# Design Document: Microservices Architecture Transformation

## Overview

This design document outlines the transformation of the InterpreLab monolithic React application into a microservices architecture optimized for performance, scalability, and independent deployment. The primary driver is dramatically improving landing page load times (target: <2s, <150KB bundle) by separating lightweight marketing content from heavy feature applications.

### Key Design Goals

1. **Performance**: Landing page loads in under 2 seconds with minimal bundle size
2. **Isolation**: Each feature (InterpreStudy, InterpreTrack, etc.) is an independent service
3. **Seamless UX**: Users experience a unified application despite distributed architecture
4. **Developer Experience**: Monorepo with shared tooling, easy local development
5. **Production Ready**: Containerized, orchestrated, monitored, and resilient

### Architecture Philosophy

- **Micro-frontends**: Each service is a complete React application
- **API Gateway Pattern**: Single entry point for routing and authentication
- **Shared Component Library**: Consistent UI without code duplication
- **Database per Service**: Isolated data stores with API-based sharing
- **Event-Driven Communication**: Loose coupling between services
- **Progressive Enhancement**: Core functionality works even if features fail

## Architecture

### High-Level System Architecture


```
┌─────────────────────────────────────────────────────────────────┐
│                         CDN (Cloudflare)                         │
│                    Static Assets + Edge Caching                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      API Gateway (Kong/Nginx)                    │
│              Routing │ Auth │ Rate Limiting │ CORS               │
└─────┬──────┬──────┬──────┬──────┬──────┬──────┬─────────────────┘
      │      │      │      │      │      │      │
      ▼      ▼      ▼      ▼      ▼      ▼      ▼
┌─────────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌──────────┐
│ Landing │ │Bot │ │Coach│ │Study│ │Track│ │Hub │ │  Auth    │
│ Service │ │Svc │ │ Svc │ │ Svc │ │ Svc │ │Svc │ │ Service  │
│ (Static)│ │    │ │     │ │     │ │     │ │    │ │ (Central)│
└────┬────┘ └─┬──┘ └──┬──┘ └──┬──┘ └──┬──┘ └─┬──┘ └────┬─────┘
     │        │       │       │       │      │         │
     └────────┴───────┴───────┴───────┴──────┴─────────┘
                             │
                    ┌────────▼────────┐
                    │  Shared Packages │
                    │  - UI Components │
                    │  - Utils Library │
                    │  - Types Package │
                    └─────────────────┘
```

### Service Breakdown

**Landing Service** (Static Site)
- Pages: Index, About, Contact, Resources, Waitlist
- Bundle: <150KB gzipped
- Deployment: Static hosting (Vercel/Netlify) or CDN
- No authentication required

**Feature Services** (Dynamic Apps)
- InterpreBot Service: AI assessment and training
- InterpreCoach Service: Real-time browser extension
- InterpreStudy Service: Interactive training hub (1100+ lines)
- InterpreTrack Service: Session tracking and earnings
- InterpreHub Service: Community network (protected)

**Auth Service** (Centralized)
- JWT token issuance and validation
- Session management
- OAuth integration (Google, etc.)
- User profile management

**Shared Packages**
- @interprelab/ui: Component library (shadcn/ui)
- @interprelab/utils: Common utilities
- @interprelab/types: TypeScript definitions
- @interprelab/config: Shared configuration



## Components and Interfaces

### 1. Monorepo Structure

```
interprelab-monorepo/
├── services/
│   ├── landing/              # Static marketing site
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Index.tsx
│   │   │   │   ├── About.tsx
│   │   │   │   ├── Contact.tsx
│   │   │   │   ├── Resources.tsx
│   │   │   │   └── Waitlist.tsx
│   │   │   └── components/
│   │   │       └── landing/  # Landing-specific components
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── Dockerfile
│   │
│   ├── interprebot/          # AI Assessment Service
│   │   ├── src/
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   ├── interprecoach/        # Real-time Assistant Service
│   │   ├── src/
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   ├── interprestudy/        # Training Hub Service
│   │   ├── src/
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   ├── interpretrack/        # Tracking Service
│   │   ├── src/
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   ├── interprehub/          # Community Service
│   │   ├── src/
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   └── auth/                 # Authentication Service
│       ├── src/
│       ├── package.json
│       └── Dockerfile
│
├── packages/
│   ├── ui/                   # Shared UI Components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/      # shadcn/ui components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── ...
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── utils/                # Shared Utilities
│   │   ├── src/
│   │   │   ├── formatting/
│   │   │   ├── validation/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── types/                # Shared TypeScript Types
│   │   ├── src/
│   │   │   ├── user.ts
│   │   │   ├── call.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── config/               # Shared Configuration
│       ├── eslint-config/
│       ├── tsconfig/
│       └── tailwind-config/
│
├── infrastructure/
│   ├── api-gateway/          # Kong/Nginx configuration
│   │   ├── kong.yml
│   │   └── nginx.conf
│   ├── kubernetes/           # K8s manifests
│   │   ├── deployments/
│   │   ├── services/
│   │   └── ingress/
│   └── terraform/            # Infrastructure as Code
│       ├── main.tf
│       └── variables.tf
│
├── scripts/
│   ├── build-all.sh
│   ├── deploy-service.sh
│   └── local-dev.sh
│
├── package.json              # Root workspace config
├── pnpm-workspace.yaml       # pnpm workspaces
├── turbo.json                # Turborepo config
├── docker-compose.yml        # Local development
└── README.md
```



### 2. API Gateway Configuration

**Technology Choice**: Kong Gateway (open-source, production-ready)

**Gateway Responsibilities**:
- Route requests to appropriate services
- JWT token validation
- Rate limiting (per-user, per-IP)
- CORS handling
- Request/response transformation
- Circuit breaking
- Load balancing

**Routing Rules**:

```yaml
# kong.yml
services:
  - name: landing-service
    url: http://landing:3000
    routes:
      - name: landing-root
        paths:
          - /
          - /about
          - /contact
          - /resources
          - /waitlist

  - name: interprebot-service
    url: http://interprebot:3001
    routes:
      - name: interprebot
        paths:
          - /interprebot

  - name: interprecoach-service
    url: http://interprecoach:3002
    routes:
      - name: interprecoach
        paths:
          - /interprecoach

  - name: interprestudy-service
    url: http://interprestudy:3003
    routes:
      - name: interprestudy
        paths:
          - /interprestudy

  - name: interpretrack-service
    url: http://interpretrack:3004
    routes:
      - name: interpretrack
        paths:
          - /interpretrack
    plugins:
      - name: jwt
        config:
          claims_to_verify:
            - exp

  - name: interprehub-service
    url: http://interprehub:3005
    routes:
      - name: interprehub
        paths:
          - /interprehub
    plugins:
      - name: jwt
        config:
          claims_to_verify:
            - exp

  - name: auth-service
    url: http://auth:3006
    routes:
      - name: auth
        paths:
          - /api/auth

plugins:
  - name: rate-limiting
    config:
      minute: 100
      hour: 1000

  - name: cors
    config:
      origins:
        - "*"
      methods:
        - GET
        - POST
        - PUT
        - DELETE
      headers:
        - Authorization
        - Content-Type
      credentials: true
```



### 3. Landing Service (Static Site)

**Technology**: Vite + React (Static Build)

**Bundle Optimization Strategy**:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Minimal vendor chunk
          'react-vendor': ['react', 'react-dom'],
          // Landing-specific components
          'landing-components': [
            './src/components/landing/Hero',
            './src/components/landing/Features',
          ],
        },
      },
    },
    // Aggressive minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Tree-shaking optimization
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
```

**Performance Optimizations**:
1. **Image Optimization**: WebP with JPEG fallback, lazy loading
2. **Font Loading**: Preload critical fonts, font-display: swap
3. **Critical CSS**: Inline above-the-fold styles
4. **Preconnect**: DNS prefetch for external resources
5. **Service Worker**: Cache static assets for repeat visits

**Deployment**: Vercel or Netlify (edge network, automatic HTTPS, instant rollbacks)



### 4. Feature Services (Dynamic Apps)

**Technology**: Vite + React (SPA with lazy loading)

**Service Template Structure**:

```typescript
// services/interprestudy/src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@interprelab/auth-client';
import { ThemeProvider } from '@interprelab/ui';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter basename="/interprestudy">
            <Routes>
              <Route path="/" element={<InterpreStudyHome />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/modules/:moduleId" element={<Module />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
```

**Dockerfile Template**:

```dockerfile
# Multi-stage build for feature services
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY services/interprestudy/ ./services/interprestudy/

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Build the service
WORKDIR /app/services/interprestudy
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/services/interprestudy/dist /usr/share/nginx/html

# Copy nginx config
COPY infrastructure/nginx/service.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```



### 5. Auth Service (Centralized Authentication)

**Technology**: Node.js + Express + Supabase Auth

**API Endpoints**:

```typescript
// services/auth/src/routes/auth.ts
import express from 'express';
import { supabase } from '../lib/supabase';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Sign in
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  // Issue JWT token
  const token = jwt.sign(
    { userId: data.user.id, email: data.user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Set HTTP-only cookie
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ user: data.user });
});

// Sign out
router.post('/signout', async (req, res) => {
  await supabase.auth.signOut();
  res.clearCookie('auth_token');
  res.json({ message: 'Signed out successfully' });
});

// Validate token
router.get('/validate', async (req, res) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  const { data, error } = await supabase.auth.refreshSession();

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  const token = jwt.sign(
    { userId: data.user.id, email: data.user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ user: data.user });
});

export default router;
```



### 6. Shared Component Library (@interprelab/ui)

**Package Structure**:

```typescript
// packages/ui/package.json
{
  "name": "@interprelab/ui",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "tsup": "^8.0.0",
    "typescript": "^5.8.0"
  }
}
```

**Component Exports**:

```typescript
// packages/ui/src/index.ts
export { Button } from './components/ui/button';
export { Card, CardHeader, CardContent } from './components/ui/card';
export { Badge } from './components/ui/badge';
export { Dialog } from './components/ui/dialog';
export { Input } from './components/ui/input';
export { Toast, Toaster } from './components/ui/toast';
// ... all shadcn/ui components

// Shared layouts
export { Navigation } from './components/Navigation';
export { Footer } from './components/Footer';

// Theme provider
export { ThemeProvider } from './components/ThemeProvider';
```

**Usage in Services**:

```typescript
// services/interprestudy/package.json
{
  "dependencies": {
    "@interprelab/ui": "workspace:*",
    "@interprelab/utils": "workspace:*",
    "@interprelab/types": "workspace:*"
  }
}

// services/interprestudy/src/pages/Home.tsx
import { Button, Card } from '@interprelab/ui';
import { formatDate } from '@interprelab/utils';
import type { User } from '@interprelab/types';

export default function Home() {
  return (
    <Card>
      <Button>Get Started</Button>
    </Card>
  );
}
```



## Data Models

### Service-Specific Data Isolation

Each service maintains its own data collections in Firestore:

```typescript
// Database structure
firestore/
├── landing/
│   ├── waitlist/           # Waitlist signups
│   └── contact_forms/      # Contact submissions
│
├── interprebot/
│   ├── assessments/        # AI assessment results
│   └── training_sessions/  # Training data
│
├── interprecoach/
│   ├── sessions/           # Real-time session data
│   └── terminology/        # Terminology lookups
│
├── interprestudy/
│   ├── courses/            # Course content
│   ├── progress/           # User progress
│   └── simulations/        # Simulation results
│
├── interpretrack/
│   ├── calls/              # Call records
│   ├── earnings/           # Earnings data
│   └── analytics/          # Analytics data
│
├── interprehub/
│   ├── posts/              # Community posts
│   ├── comments/           # Comments
│   └── connections/        # User connections
│
└── auth/
    ├── users/              # User profiles
    ├── sessions/           # Active sessions
    └── refresh_tokens/     # Refresh tokens
```

### Shared Data Access Pattern

When services need data from other services, they use API calls:

```typescript
// services/interprestudy/src/lib/userService.ts
import { apiClient } from '@interprelab/api-client';

export async function getUserProfile(userId: string) {
  // Call Auth Service API instead of direct DB access
  const response = await apiClient.get(`/api/auth/users/${userId}`);
  return response.data;
}

export async function getCallHistory(userId: string) {
  // Call InterpreTrack Service API
  const response = await apiClient.get(`/api/interpretrack/calls`, {
    params: { userId },
  });
  return response.data;
}
```

### Event-Driven Data Synchronization

For real-time updates across services, use Pub/Sub:

```typescript
// services/auth/src/events/userUpdated.ts
import { pubsub } from '../lib/pubsub';

export async function publishUserUpdated(userId: string, updates: any) {
  await pubsub.publish('user.updated', {
    userId,
    updates,
    timestamp: new Date().toISOString(),
  });
}

// services/interprestudy/src/events/subscribers.ts
import { pubsub } from '../lib/pubsub';

pubsub.subscribe('user.updated', async (message) => {
  const { userId, updates } = message;
  // Update local cache or trigger UI refresh
  await updateLocalUserCache(userId, updates);
});
```



## Cross-Service Navigation

### Client-Side Routing Strategy

**Problem**: Users need seamless navigation between services without full page reloads.

**Solution**: Module Federation + Shared Shell

```typescript
// Shell application (minimal wrapper)
// services/shell/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation, Footer } from '@interprelab/ui';
import { lazy, Suspense } from 'react';

// Lazy load each service
const LandingApp = lazy(() => import('landing/App'));
const InterpreBotApp = lazy(() => import('interprebot/App'));
const InterpreCoachApp = lazy(() => import('interprecoach/App'));
const InterpreStudyApp = lazy(() => import('interprestudy/App'));
const InterpreTrackApp = lazy(() => import('interpretrack/App'));
const InterpreHubApp = lazy(() => import('interprehub/App'));

export default function Shell() {
  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/*" element={<LandingApp />} />
          <Route path="/interprebot/*" element={<InterpreBotApp />} />
          <Route path="/interprecoach/*" element={<InterpreCoachApp />} />
          <Route path="/interprestudy/*" element={<InterpreStudyApp />} />
          <Route path="/interpretrack/*" element={<InterpreTrackApp />} />
          <Route path="/interprehub/*" element={<InterpreHubApp />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
```

**Module Federation Configuration**:

```typescript
// services/interprestudy/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'interprestudy',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@interprelab/ui': { singleton: true },
      },
    }),
  ],
});
```



## Deployment Architecture

### Container Orchestration (Google Cloud Run)

**Why Cloud Run**:
- Serverless (no cluster management)
- Auto-scaling (0 to N instances)
- Pay-per-use (cost-effective for variable traffic)
- Built-in load balancing
- Easy CI/CD integration

**Service Deployment Configuration**:

```yaml
# infrastructure/cloud-run/landing-service.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: landing-service
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/minScale: "1"
        autoscaling.knative.dev/maxScale: "10"
    spec:
      containers:
        - image: gcr.io/interprelab/landing:latest
          ports:
            - containerPort: 80
          resources:
            limits:
              memory: "256Mi"
              cpu: "1"
          env:
            - name: NODE_ENV
              value: "production"
```

```yaml
# infrastructure/cloud-run/interprestudy-service.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: interprestudy-service
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/minScale: "0"
        autoscaling.knative.dev/maxScale: "20"
    spec:
      containers:
        - image: gcr.io/interprelab/interprestudy:latest
          ports:
            - containerPort: 80
          resources:
            limits:
              memory: "512Mi"
              cpu: "2"
          env:
            - name: NODE_ENV
              value: "production"
            - name: GEMINI_API_KEY
              valueFrom:
                secretKeyRef:
                  name: gemini-api-key
                  key: key
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy-service.yml
name: Deploy Service

on:
  push:
    branches: [main]
    paths:
      - 'services/**'
      - 'packages/**'

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      services: ${{ steps.filter.outputs.changes }}
    steps:
      - uses: actions/checkout@v3
      - uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            landing:
              - 'services/landing/**'
            interprebot:
              - 'services/interprebot/**'
            interprestudy:
              - 'services/interprestudy/**'

  build-and-deploy:
    needs: detect-changes
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: ${{ fromJSON(needs.detect-changes.outputs.services) }}
    steps:
      - uses: actions/checkout@v3

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: ${{ secrets.GCP_PROJECT_ID }}

      - name: Build Docker image
        run: |
          docker build -t gcr.io/${{ secrets.GCP_PROJECT_ID }}/${{ matrix.service }}:${{ github.sha }} \
            -f services/${{ matrix.service }}/Dockerfile .

      - name: Push to GCR
        run: |
          docker push gcr.io/${{ secrets.GCP_PROJECT_ID }}/${{ matrix.service }}:${{ github.sha }}

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy ${{ matrix.service }}-service \
            --image gcr.io/${{ secrets.GCP_PROJECT_ID }}/${{ matrix.service }}:${{ github.sha }} \
            --region us-central1 \
            --platform managed \
            --allow-unauthenticated
```



## Local Development Environment

### Docker Compose Setup

```yaml
# docker-compose.yml
version: '3.8'

services:
  # API Gateway
  kong:
    image: kong:latest
    environment:
      KONG_DATABASE: "off"
      KONG_DECLARATIVE_CONFIG: /kong/kong.yml
      KONG_PROXY_ACCESS_LOG: /dev/stdout
      KONG_ADMIN_ACCESS_LOG: /dev/stdout
      KONG_PROXY_ERROR_LOG: /dev/stderr
      KONG_ADMIN_ERROR_LOG: /dev/stderr
    volumes:
      - ./infrastructure/api-gateway/kong.yml:/kong/kong.yml
    ports:
      - "8000:8000"  # Proxy
      - "8001:8001"  # Admin API

  # Landing Service
  landing:
    build:
      context: .
      dockerfile: services/landing/Dockerfile
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=development

  # InterpreBot Service
  interprebot:
    build:
      context: .
      dockerfile: services/interprebot/Dockerfile
    ports:
      - "3001:80"
    environment:
      - NODE_ENV=development

  # InterpreCoach Service
  interprecoach:
    build:
      context: .
      dockerfile: services/interprecoach/Dockerfile
    ports:
      - "3002:80"

  # InterpreStudy Service
  interprestudy:
    build:
      context: .
      dockerfile: services/interprestudy/Dockerfile
    ports:
      - "3003:80"
    environment:
      - VITE_GEMINI_API_KEY=${GEMINI_API_KEY}

  # InterpreTrack Service
  interpretrack:
    build:
      context: .
      dockerfile: services/interpretrack/Dockerfile
    ports:
      - "3004:80"

  # InterpreHub Service
  interprehub:
    build:
      context: .
      dockerfile: services/interprehub/Dockerfile
    ports:
      - "3005:80"

  # Auth Service
  auth:
    build:
      context: .
      dockerfile: services/auth/Dockerfile
    ports:
      - "3006:3000"
    environment:
      - JWT_SECRET=${JWT_SECRET}
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_KEY=${SUPABASE_KEY}

networks:
  default:
    name: interprelab-network
```

### Development Scripts

```bash
# scripts/local-dev.sh
#!/bin/bash

echo "Starting InterpreLab local development environment..."

# Start all services
docker-compose up -d

# Wait for services to be healthy
echo "Waiting for services to start..."
sleep 10

# Show service URLs
echo "Services are running:"
echo "  API Gateway: http://localhost:8000"
echo "  Landing:     http://localhost:3000"
echo "  InterpreBot: http://localhost:3001"
echo "  InterpreCoach: http://localhost:3002"
echo "  InterpreStudy: http://localhost:3003"
echo "  InterpreTrack: http://localhost:3004"
echo "  InterpreHub: http://localhost:3005"
echo "  Auth API:    http://localhost:3006"

# Tail logs
docker-compose logs -f
```



## Monitoring and Observability

### Logging Strategy

**Structured Logging with Winston**:

```typescript
// packages/logger/src/index.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: process.env.SERVICE_NAME,
    environment: process.env.NODE_ENV,
  },
  transports: [
    new winston.transports.Console(),
    // In production, send to Google Cloud Logging
    process.env.NODE_ENV === 'production' &&
      new winston.transports.Http({
        host: 'logging.googleapis.com',
        path: '/v2/entries:write',
      }),
  ].filter(Boolean),
});

// Add correlation ID middleware
export function correlationMiddleware(req, res, next) {
  req.correlationId = req.headers['x-correlation-id'] || generateId();
  res.setHeader('x-correlation-id', req.correlationId);

  logger.defaultMeta.correlationId = req.correlationId;
  next();
}
```

### Distributed Tracing

**OpenTelemetry Integration**:

```typescript
// packages/tracing/src/index.ts
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';

export function initTracing(serviceName: string) {
  const provider = new NodeTracerProvider({
    resource: {
      attributes: {
        'service.name': serviceName,
      },
    },
  });

  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
    ],
  });

  provider.register();
}
```

### Metrics Collection

**Prometheus Metrics**:

```typescript
// packages/metrics/src/index.ts
import promClient from 'prom-client';

const register = new promClient.Registry();

// Default metrics (CPU, memory, etc.)
promClient.collectDefaultMetrics({ register });

// Custom metrics
export const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

export const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

// Expose metrics endpoint
export function metricsEndpoint(req, res) {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
}
```

### Health Checks

```typescript
// packages/health/src/index.ts
export interface HealthCheck {
  name: string;
  check: () => Promise<boolean>;
}

export class HealthChecker {
  private checks: HealthCheck[] = [];

  addCheck(check: HealthCheck) {
    this.checks.push(check);
  }

  async checkHealth() {
    const results = await Promise.all(
      this.checks.map(async (check) => ({
        name: check.name,
        healthy: await check.check().catch(() => false),
      }))
    );

    const allHealthy = results.every((r) => r.healthy);

    return {
      status: allHealthy ? 'healthy' : 'unhealthy',
      checks: results,
      timestamp: new Date().toISOString(),
    };
  }
}

// Usage in service
const healthChecker = new HealthChecker();

healthChecker.addCheck({
  name: 'database',
  check: async () => {
    const result = await db.query('SELECT 1');
    return result.rows.length > 0;
  },
});

healthChecker.addCheck({
  name: 'external-api',
  check: async () => {
    const response = await fetch('https://api.example.com/health');
    return response.ok;
  },
});

app.get('/health', async (req, res) => {
  const health = await healthChecker.checkHealth();
  res.status(health.status === 'healthy' ? 200 : 503).json(health);
});
```



## Error Handling and Resilience

### Circuit Breaker Pattern

```typescript
// packages/resilience/src/circuitBreaker.ts
export class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime: number | null = null;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000,
    private resetTimeout: number = 30000
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime! > this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await Promise.race([
        fn(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), this.timeout)
        ),
      ]);

      if (this.state === 'HALF_OPEN') {
        this.reset();
      }

      return result as T;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }

  private recordFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }

  private reset() {
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED';
  }
}

// Usage
const breaker = new CircuitBreaker(5, 5000, 30000);

async function callExternalService() {
  return breaker.execute(async () => {
    const response = await fetch('https://api.example.com/data');
    return response.json();
  });
}
```

### Retry Logic with Exponential Backoff

```typescript
// packages/resilience/src/retry.ts
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}

// Usage
const data = await retryWithBackoff(
  () => fetch('https://api.example.com/data').then((r) => r.json()),
  3,
  1000
);
```

### Graceful Degradation

```typescript
// services/interprestudy/src/lib/aiService.ts
import { CircuitBreaker } from '@interprelab/resilience';

const geminiBreaker = new CircuitBreaker(5, 10000, 60000);

export async function generateAIContent(prompt: string): Promise<string> {
  try {
    return await geminiBreaker.execute(async () => {
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Gemini API error');
      }

      const data = await response.json();
      return data.content;
    });
  } catch (error) {
    logger.error('AI service unavailable, using fallback', { error });

    // Graceful degradation: return cached or default content
    return getFallbackContent(prompt);
  }
}

function getFallbackContent(prompt: string): string {
  // Return pre-generated content or helpful message
  return 'AI features are temporarily unavailable. Please try again later.';
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Performance Properties

**Property 1: Landing Bundle Size Constraint**
*For any* landing page build configuration, the gzipped bundle size should be under 150KB.
**Validates: Requirements 1.1**

**Property 2: First Contentful Paint Performance**
*For any* landing page load on a simulated 3G network, First Contentful Paint should occur within 1.2 seconds.
**Validates: Requirements 1.2**

**Property 3: Time-to-Interactive Performance**
*For any* landing page load on a simulated 3G network, Time-to-Interactive should occur within 2.5 seconds.
**Validates: Requirements 1.3**

**Property 4: Static Asset Caching**
*For any* static asset request (images, CSS, JS), the response should include Cache-Control headers with max-age of 1 year.
**Validates: Requirements 1.4**

**Property 5: Bundle Isolation**
*For any* landing page load, the network requests should not include any code from feature services (InterpreStudy, InterpreTrack, etc.).
**Validates: Requirements 1.5**

### Service Independence Properties

**Property 6: Independent Deployment**
*For any* code change to a single service, the build system should only rebuild that service, not other services.
**Validates: Requirements 2.1**

**Property 7: Independent Scaling**
*For any* service experiencing high load, the orchestration system should scale only that service's instances.
**Validates: Requirements 2.2**

**Property 8: Fault Isolation**
*For any* service crash, all other services should continue functioning normally.
**Validates: Requirements 2.3**

**Property 9: API Contract Versioning**
*For any* inter-service API call, the endpoint URL should include a version prefix (e.g., /v1/, /v2/).
**Validates: Requirements 2.5**

### Navigation and Authentication Properties

**Property 10: Cross-Service Authentication Persistence**
*For any* authenticated user navigating from one service to another, the authentication token should remain valid.
**Validates: Requirements 3.1**

**Property 11: SPA Navigation Behavior**
*For any* navigation between services using the shell application, the browser should not perform a full page reload.
**Validates: Requirements 3.2**

**Property 12: Secure Token Sharing**
*For any* authenticated session, the auth cookie should be accessible to all service domains with HttpOnly and Secure flags.
**Validates: Requirements 3.3**

**Property 13: Lazy Loading Isolation**
*For any* navigation to a feature service, only that service's JavaScript bundle should be loaded, not other services' code.
**Validates: Requirements 3.4**

**Property 14: URL Synchronization**
*For any* navigation action, the browser URL should update to reflect the current service and route.
**Validates: Requirements 3.5**

### Shared Library Properties

**Property 15: Component Library Accessibility**
*For any* service, importing from @interprelab/ui should resolve successfully without errors.
**Validates: Requirements 4.1**

**Property 16: Tree-Shaking Effectiveness**
*For any* service importing specific components from @interprelab/ui, the final bundle should not include unused components.
**Validates: Requirements 4.3**

**Property 17: TypeScript Definitions Availability**
*For any* published version of @interprelab/ui, the package should include .d.ts files for all exported components.
**Validates: Requirements 4.4**

**Property 18: Theme Consistency**
*For any* service using @interprelab/ui components, the CSS variables should match the shared design tokens.
**Validates: Requirements 4.5**

### Container and Orchestration Properties

**Property 19: Container Image Size Limit**
*For any* service Docker image, the compressed image size should be under 200MB.
**Validates: Requirements 5.1**

**Property 20: Multi-Stage Build Usage**
*For any* service Dockerfile, it should use at least two stages (builder and production).
**Validates: Requirements 5.2**

**Property 21: Health Check Endpoint Availability**
*For any* running service, a GET request to /health should return a 200 status code.
**Validates: Requirements 5.4**

**Property 22: Horizontal Scaling Support**
*For any* service deployment configuration, autoscaling rules based on CPU and memory should be defined.
**Validates: Requirements 5.5**

### API Gateway Properties

**Property 23: Path-Based Routing**
*For any* request to a service-specific path, the API Gateway should route it to the correct backend service.
**Validates: Requirements 6.1**

**Property 24: URL Rewriting**
*For any* request routed through the gateway, the backend service should receive the URL without the service prefix.
**Validates: Requirements 6.2**

**Property 25: JWT Validation**
*For any* request to a protected endpoint without a valid JWT token, the API Gateway should return a 401 status.
**Validates: Requirements 6.3**

**Property 26: Rate Limiting Enforcement**
*For any* user or IP exceeding the rate limit, subsequent requests should return a 429 status.
**Validates: Requirements 6.4**

**Property 27: Service Unavailability Handling**
*For any* request to an unavailable service, the API Gateway should return a 503 status with a retry-after header.
**Validates: Requirements 6.5**

### Authentication Service Properties

**Property 28: Cross-Service Token Validity**
*For any* JWT token issued by the Auth Service, it should be accepted by all feature services.
**Validates: Requirements 7.1**

**Property 29: Secure Cookie Attributes**
*For any* authentication response, the Set-Cookie header should include HttpOnly, Secure, and SameSite=Lax attributes.
**Validates: Requirements 7.2**

**Property 30: Token Validation Without Re-Auth**
*For any* valid token, accessing protected routes should not require re-authentication.
**Validates: Requirements 7.3**

**Property 31: Automatic Token Refresh**
*For any* expired token with a valid refresh token, the system should automatically issue a new access token.
**Validates: Requirements 7.4**

**Property 32: Token Revocation on Sign Out**
*For any* sign-out action, subsequent requests with the old token should be rejected by all services.
**Validates: Requirements 7.5**

### Monorepo and Build Properties

**Property 33: Workspace Dependency Deduplication**
*For any* monorepo installation, shared dependencies should appear only once in the root node_modules.
**Validates: Requirements 8.3**

**Property 34: Selective Service Building**
*For any* build command targeting a specific service, only that service and its dependencies should be built.
**Validates: Requirements 8.4**

**Property 35: Affected Service Testing**
*For any* code commit, only services affected by the changes should have their tests run.
**Validates: Requirements 8.5**

### Service Boundary Properties

**Property 36: Landing Service Purity**
*For any* code file in the Landing Service, it should not import or reference feature-specific logic.
**Validates: Requirements 9.1**

**Property 37: Feature Service Isolation**
*For any* feature service, it should only contain code specific to that feature, not other features.
**Validates: Requirements 9.2**

**Property 38: No Code Duplication**
*For any* utility function, it should exist in shared packages, not duplicated across services.
**Validates: Requirements 9.3**

**Property 39: API-Based Communication**
*For any* inter-service communication, it should use HTTP APIs or message queues, not direct function calls.
**Validates: Requirements 9.4**

**Property 40: Database Isolation**
*For any* service, it should only read/write to its own Firestore collections, not other services' collections.
**Validates: Requirements 9.5**

### CI/CD Properties

**Property 41: Incremental Builds**
*For any* code push, only services with changed files should trigger new builds.
**Validates: Requirements 10.1**

**Property 42: Test-Before-Deploy**
*For any* deployment pipeline, tests must pass before deployment proceeds.
**Validates: Requirements 10.2**

**Property 43: Automatic Staging Deployment**
*For any* successful build on the main branch, the service should automatically deploy to staging.
**Validates: Requirements 10.3**

**Property 44: Automatic Rollback**
*For any* failed deployment, the system should automatically rollback to the previous working version.
**Validates: Requirements 10.5**

### Configuration Properties

**Property 45: Service-Specific Environment Variables**
*For any* service startup, it should load only its own environment variables, not other services' variables.
**Validates: Requirements 11.1**

**Property 46: Configuration Isolation**
*For any* configuration change to one service, other services should remain unaffected.
**Validates: Requirements 11.2**

**Property 47: Secrets Manager Usage**
*For any* sensitive configuration value, it should be loaded from Google Secret Manager, not environment files.
**Validates: Requirements 11.3**

**Property 48: Configuration Validation**
*For any* invalid configuration, the service should fail to start with a clear error message.
**Validates: Requirements 11.5**

### Observability Properties

**Property 49: Structured Logging**
*For any* log entry, it should be in JSON format with timestamp, service name, and log level.
**Validates: Requirements 12.1**

**Property 50: Correlation ID Propagation**
*For any* request spanning multiple services, all log entries should include the same correlation ID.
**Validates: Requirements 12.2**

**Property 51: Metrics Exposure**
*For any* service, it should expose Prometheus metrics at /metrics endpoint.
**Validates: Requirements 12.3**

**Property 52: Distributed Tracing**
*For any* request, OpenTelemetry traces should be collected showing the request flow across services.
**Validates: Requirements 12.5**

### Resilience Properties

**Property 53: Landing Service Availability**
*For any* feature service failure, the Landing Service should continue to load and function normally.
**Validates: Requirements 13.1**

**Property 54: User-Friendly Error Messages**
*For any* service error, the UI should display a user-friendly message, not technical stack traces.
**Validates: Requirements 13.2**

**Property 55: Timeout Enforcement**
*For any* service request, if no response is received within 5 seconds, a timeout error should be returned.
**Validates: Requirements 13.3**

**Property 56: Automatic Service Recovery**
*For any* service restart after failure, it should automatically rejoin the service mesh without manual intervention.
**Validates: Requirements 13.4**

**Property 57: Graceful Degradation**
*For any* critical service failure, the system should serve cached content or fallback pages instead of complete failure.
**Validates: Requirements 13.5**

### Data Isolation Properties

**Property 58: Firestore Collection Isolation**
*For any* service, its Firestore collections should be prefixed with the service name (e.g., interpretrack_calls).
**Validates: Requirements 14.1**

**Property 59: API-Based Data Sharing**
*For any* cross-service data access, it should occur through API calls, not direct database queries.
**Validates: Requirements 14.2**

**Property 60: Schema Independence**
*For any* schema change in one service, other services' schemas should remain unchanged.
**Validates: Requirements 14.3**

### Local Development Properties

**Property 61: Service Discovery**
*For any* service running locally via Docker Compose, it should be able to resolve other services by name.
**Validates: Requirements 15.2**

**Property 62: Hot Reload Support**
*For any* code change in development mode, the service should automatically reload without manual restart.
**Validates: Requirements 15.3**



## Testing Strategy

### Unit Testing

**Framework**: Vitest + React Testing Library

**Test Coverage Areas**:

1. **Component Library Tests** (@interprelab/ui)
   - Each UI component renders correctly
   - Props are handled properly
   - Accessibility attributes are present
   - Theme variables are applied

2. **Utility Library Tests** (@interprelab/utils)
   - Formatting functions produce correct output
   - Validation functions catch invalid input
   - Edge cases are handled

3. **Service-Specific Tests**
   - API route handlers return correct responses
   - Business logic functions work correctly
   - Error handling behaves as expected

### Property-Based Testing

**Framework**: fast-check (JavaScript property-based testing library)

**Configuration**: Each property-based test should run a minimum of 100 iterations.

**Property Test Implementation**:

Each correctness property from the design document must be implemented as a property-based test. Tests must be tagged with comments explicitly referencing the property:

```typescript
// Example property test
import fc from 'fast-check';
import { describe, it, expect } from 'vitest';

describe('Landing Service Bundle Size', () => {
  it('should produce bundles under 150KB gzipped', () => {
    /**
     * Feature: microservices-architecture, Property 1: Landing Bundle Size Constraint
     * For any landing page build configuration, the gzipped bundle size should be under 150KB.
     */
    fc.assert(
      fc.property(
        fc.record({
          minify: fc.boolean(),
          sourcemap: fc.boolean(),
          target: fc.constantFrom('es2015', 'es2020', 'esnext'),
        }),
        async (buildConfig) => {
          const bundle = await buildLandingService(buildConfig);
          const gzippedSize = await getGzippedSize(bundle);
          expect(gzippedSize).toBeLessThan(150 * 1024); // 150KB
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Key Property Tests**:

1. **Performance Properties** (1-5): Use Lighthouse CI to measure metrics
2. **Service Independence** (6-9): Test build system and deployment isolation
3. **Navigation Properties** (10-14): Test cross-service navigation flows
4. **Container Properties** (19-22): Test Docker image builds and health checks
5. **API Gateway Properties** (23-27): Test routing, auth, and rate limiting
6. **Authentication Properties** (28-32): Test token lifecycle and validation
7. **Resilience Properties** (53-57): Test fault injection and recovery

### Integration Testing

**Framework**: Playwright for end-to-end tests

**Test Scenarios**:

1. **Cross-Service Navigation**
   - User navigates from Landing to InterpreStudy
   - Authentication state persists
   - No full page reloads occur

2. **Authentication Flow**
   - User signs in on Landing
   - Navigates to protected InterpreHub
   - Access is granted without re-authentication
   - User signs out
   - Access to protected routes is denied

3. **Service Failure Handling**
   - Stop InterpreStudy service
   - Landing page continues to work
   - Navigation to InterpreStudy shows error message
   - Restart InterpreStudy service
   - Navigation to InterpreStudy works again

4. **Performance Testing**
   - Load Landing page on simulated 3G
   - Measure FCP and TTI
   - Verify metrics meet requirements

### Load Testing

**Framework**: k6 or Artillery

**Test Scenarios**:

1. **Independent Scaling**
   - Generate high load on InterpreTrack
   - Verify only InterpreTrack scales up
   - Verify other services remain at baseline

2. **API Gateway Rate Limiting**
   - Send requests exceeding rate limit
   - Verify 429 responses are returned
   - Verify legitimate requests still succeed

3. **Circuit Breaker**
   - Simulate slow external API
   - Verify circuit breaker opens
   - Verify fallback content is served



## Migration Strategy

### Phase 1: Setup Monorepo and Shared Packages (Week 1-2)

**Goals**:
- Create monorepo structure
- Extract shared UI components into @interprelab/ui
- Extract utilities into @interprelab/utils
- Set up build tooling (Turborepo)

**Steps**:
1. Initialize monorepo with pnpm workspaces
2. Create packages/ui with all shadcn/ui components
3. Create packages/utils with formatting and validation utilities
4. Create packages/types with TypeScript definitions
5. Set up Turborepo for efficient builds
6. Verify all packages build successfully

**Success Criteria**:
- All shared packages build without errors
- Services can import from shared packages
- Build times are optimized with caching

### Phase 2: Extract Landing Service (Week 3)

**Goals**:
- Create standalone Landing Service
- Optimize for performance (<150KB bundle)
- Deploy to Vercel/Netlify

**Steps**:
1. Create services/landing directory
2. Move Index, About, Contact, Resources, Waitlist pages
3. Move landing-specific components
4. Configure Vite for aggressive optimization
5. Implement image optimization
6. Deploy to Vercel
7. Verify performance metrics

**Success Criteria**:
- Landing bundle < 150KB gzipped
- FCP < 1.2s on 3G
- TTI < 2.5s on 3G
- Lighthouse score > 95

### Phase 3: Extract Auth Service (Week 4)

**Goals**:
- Create centralized Auth Service
- Implement JWT token issuance
- Set up secure cookie handling

**Steps**:
1. Create services/auth directory
2. Implement Express server with auth routes
3. Integrate with Supabase Auth
4. Implement JWT token generation
5. Set up HTTP-only cookie handling
6. Deploy to Cloud Run
7. Test authentication flow

**Success Criteria**:
- Auth Service responds to /api/auth/* routes
- JWT tokens are issued correctly
- Cookies have correct security attributes
- Token validation works across services

### Phase 4: Extract Feature Services (Week 5-8)

**Goals**:
- Create independent services for each feature
- Implement lazy loading
- Deploy to Cloud Run

**Steps** (repeat for each feature):
1. Create services/{feature} directory
2. Move feature-specific pages and components
3. Configure Vite with basename for routing
4. Implement Dockerfile
5. Deploy to Cloud Run
6. Test navigation and functionality

**Features to Extract**:
- InterpreBot (Week 5)
- InterpreCoach (Week 6)
- InterpreStudy (Week 7)
- InterpreTrack (Week 7)
- InterpreHub (Week 8)

**Success Criteria**:
- Each service deploys independently
- Navigation between services works
- Authentication persists across services
- Each service has its own Firestore collections

### Phase 5: Implement API Gateway (Week 9)

**Goals**:
- Set up Kong Gateway
- Configure routing rules
- Implement rate limiting and auth

**Steps**:
1. Deploy Kong Gateway to Cloud Run
2. Configure routing to all services
3. Implement JWT validation plugin
4. Set up rate limiting
5. Configure CORS
6. Test all routes

**Success Criteria**:
- All services accessible through gateway
- JWT validation works
- Rate limiting enforces limits
- CORS headers are correct

### Phase 6: Implement Monitoring and Observability (Week 10)

**Goals**:
- Set up centralized logging
- Implement distributed tracing
- Configure metrics collection

**Steps**:
1. Integrate Winston logger in all services
2. Set up Google Cloud Logging
3. Implement OpenTelemetry tracing
4. Set up Prometheus metrics
5. Configure Grafana dashboards
6. Set up alerting

**Success Criteria**:
- All services send logs to Cloud Logging
- Correlation IDs appear in all logs
- Traces show request flows
- Metrics are collected and visualized
- Alerts trigger on failures

### Phase 7: Implement Resilience Patterns (Week 11)

**Goals**:
- Add circuit breakers
- Implement retry logic
- Add graceful degradation

**Steps**:
1. Implement circuit breaker library
2. Add retry logic with exponential backoff
3. Implement fallback content for failures
4. Add health checks to all services
5. Test fault injection scenarios

**Success Criteria**:
- Circuit breakers open on failures
- Retries work with backoff
- Fallback content is served
- Health checks return correct status
- Services recover automatically

### Phase 8: Optimize and Fine-Tune (Week 12)

**Goals**:
- Optimize bundle sizes
- Improve performance metrics
- Fine-tune autoscaling

**Steps**:
1. Analyze bundle sizes and optimize
2. Implement code splitting improvements
3. Optimize images and assets
4. Fine-tune autoscaling parameters
5. Run load tests
6. Optimize database queries

**Success Criteria**:
- All performance targets met
- Autoscaling works efficiently
- Load tests pass
- No performance regressions

## Rollback Plan

### Rollback Triggers

- Performance degradation (FCP > 2s, TTI > 4s)
- Error rate > 5%
- Service unavailability > 1 minute
- Critical bugs in production

### Rollback Procedure

1. **Immediate**: Revert API Gateway routing to monolith
2. **Within 5 minutes**: Redeploy previous monolith version
3. **Within 15 minutes**: Verify all functionality restored
4. **Post-rollback**: Analyze logs and fix issues

### Rollback Testing

- Test rollback procedure in staging monthly
- Document rollback steps clearly
- Ensure team knows rollback process

## Security Considerations

### Authentication and Authorization

- JWT tokens with short expiration (7 days)
- HTTP-only, Secure, SameSite cookies
- Refresh tokens for long-lived sessions
- Token revocation on sign-out

### API Security

- Rate limiting per user and IP
- CORS configuration for allowed origins
- Input validation on all endpoints
- SQL injection prevention (using ORMs)
- XSS prevention (React's built-in escaping)

### Container Security

- Non-root user in containers
- Minimal base images (Alpine)
- No secrets in images
- Regular security updates
- Vulnerability scanning

### Network Security

- HTTPS everywhere
- TLS 1.3 minimum
- Certificate pinning for critical APIs
- VPC for internal communication
- Firewall rules for service isolation

### Data Security

- Encryption at rest (Firestore default)
- Encryption in transit (HTTPS)
- Secrets in Secret Manager
- No PII in logs
- GDPR compliance

## Cost Optimization

### Cloud Run Pricing

- Min instances: 0 for low-traffic services
- Min instances: 1 for Landing (always warm)
- CPU allocation: Only during request processing
- Memory: Right-sized per service (256MB-512MB)

### CDN Usage

- Static assets served from CDN
- 1-year cache for immutable assets
- Edge caching for landing page
- Reduced origin requests

### Database Optimization

- Firestore indexes for common queries
- Caching frequently accessed data
- Batch operations where possible
- Delete old data regularly

### Monitoring Costs

- Log retention: 30 days
- Metrics retention: 90 days
- Traces sampling: 10% of requests
- Alerts only for critical issues

**Estimated Monthly Costs**:
- Cloud Run: $50-100 (with free tier)
- Firestore: $25-50
- Cloud Logging: $10-20
- CDN: $5-10
- Total: ~$100-200/month for moderate traffic

## Performance Benchmarks

### Target Metrics

| Metric | Target | Current Monolith | Expected Microservices |
|--------|--------|------------------|------------------------|
| Landing FCP | < 1.2s | 2.5s | 0.8s |
| Landing TTI | < 2.5s | 4.2s | 1.8s |
| Landing Bundle | < 150KB | 850KB | 120KB |
| Feature Load Time | < 3s | 5s | 2.5s |
| API Response Time | < 200ms | 300ms | 150ms |
| Lighthouse Score | > 95 | 72 | 98 |

### Performance Testing Plan

1. **Baseline**: Measure current monolith performance
2. **After Each Phase**: Measure and compare
3. **Load Testing**: Simulate 1000 concurrent users
4. **Stress Testing**: Find breaking point
5. **Endurance Testing**: 24-hour sustained load

## Maintenance and Operations

### Deployment Schedule

- **Staging**: Automatic on merge to main
- **Production**: Manual promotion after QA
- **Hotfixes**: Direct to production with approval
- **Rollbacks**: Automatic on health check failures

### Monitoring Dashboards

1. **Service Health**: Uptime, error rates, response times
2. **Performance**: FCP, TTI, bundle sizes
3. **Business Metrics**: User signups, feature usage
4. **Infrastructure**: CPU, memory, network

### On-Call Rotation

- 24/7 on-call coverage
- Escalation path defined
- Runbooks for common issues
- Post-mortem for incidents

### Documentation

- Architecture diagrams (keep updated)
- API documentation (OpenAPI specs)
- Runbooks for operations
- Troubleshooting guides

## Future Enhancements

### Short-Term (3-6 months)

- Implement GraphQL gateway for unified API
- Add service mesh (Istio) for advanced traffic management
- Implement feature flags for gradual rollouts
- Add A/B testing infrastructure

### Long-Term (6-12 months)

- Migrate to Kubernetes for more control
- Implement event sourcing for audit trails
- Add real-time collaboration features
- Implement edge computing for global performance

## Conclusion

This microservices architecture transformation will dramatically improve InterpreLab's performance, scalability, and developer experience. The phased migration approach minimizes risk while delivering incremental value. With proper monitoring, resilience patterns, and operational practices, the system will be production-ready and maintainable for years to come.

