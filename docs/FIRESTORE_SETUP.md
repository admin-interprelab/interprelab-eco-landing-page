# Firestore Backend Integration Guide

## Overview

This document outlines the Firestore collection structures and setup required for the InterpreLab landing page and associated services.

## Collection Structures

### 1. FAQs Collection (`faqs`)

Used for the Collapsible FAQ section on the landing page.

```typescript
interface FAQDocument {
  id: string;                    // Auto-generated
  question: string;              // Required
  answer: string;                // Required
  category: string;              // Required: 'general' | 'products' | 'pricing' | 'technical' | 'privacy' | 'support'
  priority: number;              // Required: 1-100 (higher = shown first)
  helpfulCount: number;          // Default: 0
  notHelpfulCount: number;       // Default: 0
  createdAt: Timestamp;          // Auto-generated
  updatedAt: Timestamp;          // Auto-generated
}
```

**Indexes Required**:

- Composite: `category` (Ascending) + `priority` (Descending)
- Single: `priority` (Descending)

### 2. Resources Collection (`resources`)

Used for the Resources page, including articles and reports like "The Interpreter Dilemma".

```typescript
interface ResourceDocument {
  id: string;                    // Auto-generated
  title: string;                 // Required
  description: string;           // Required
  content: string;               // Required (markdown or HTML)
  category: string;              // Required: 'article' | 'report' | 'documentation' | 'guide'
  featured: boolean;             // Default: false
  thumbnailUrl: string;          // Required
  href: string;                  // Required (internal or external link)
  publishedDate: Timestamp;      // Required
  author: string;                // Optional
  tags: string[];                // Optional
  viewCount: number;             // Default: 0
  createdAt: Timestamp;          // Auto-generated
  updatedAt: Timestamp;          // Auto-generated
}
```

**Indexes Required**:

- Composite: `featured` (Descending) + `publishedDate` (Descending)
- Composite: `category` (Ascending) + `publishedDate` (Descending)
- Single: `publishedDate` (Descending)

### 3. Certificates Collection (`certificates`)

Used for the Certificates & Premium section.

```typescript
interface CertificateDocument {
  id: string;                    // Auto-generated
  title: string;                 // Required
  subtitle: string;              // Required
  description: string;           // Required
  price: number;                 // Required
  currency: string;              // Default: 'USD'
  features: string[];            // Required
  comingSoon: boolean;           // Default: false
  enrollmentUrl: string;         // Optional
  imageUrl: string;              // Optional
  displayOrder: number;          // Required: for sorting
  createdAt: Timestamp;          // Auto-generated
  updatedAt: Timestamp;          // Auto-generated
}
```

**Indexes Required**:

- Single: `displayOrder` (Ascending)

## Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && request.auth.token.admin == true;
    }

    // FAQs: Public read, Admin write
    match /faqs/{faqId} {
      allow read: if true;
      allow write: if isAdmin();
      
      // Allow feedback updates (simple counters)
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['helpfulCount', 'notHelpfulCount']);
    }

    // Resources: Public read, Admin write
    match /resources/{resourceId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Certificates: Public read, Admin write
    match /certificates/{certId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

## Setup Instructions

1. **Initialize Firestore**: Ensure `services/landing/src/lib/firebase.ts` is configured.
2. **Create Collections**: Use the Firebase Console or a seed script to create initial documents.
3. **Deploy Rules**: Update `firestore.rules` and deploy via Firebase CLI.
4. **Create Indexes**: Indexes will be auto-suggested by Firebase upon first query; follow the generated links to create them.
