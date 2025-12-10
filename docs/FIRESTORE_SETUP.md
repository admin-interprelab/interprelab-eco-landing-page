# Firestore Setup and Integration Guide

This document outlines the setup, collection structures, indexing, security rules, and common CRUD operations for integrating with InterpreLab's Firestore backend.

## 1. Project Overview

InterpreLab utilizes Google Cloud Firestore as its NoSQL database solution for flexible and scalable data storage.

## 2. Collection Structures

Below are the anticipated top-level collections and their primary fields. This section will be expanded with detailed schemas as the application's data models are finalized.

### `users` Collection
- **Purpose**: Stores user profiles and authentication-related data.
- **Example Fields**:
  - `uid`: User's unique ID (from Firebase Auth)
  - `email`: User's email address
  - `displayName`: User's display name
  - `roles`: Array of user roles (e.g., `['interpreter', 'admin']`)
  - `createdAt`: Timestamp
  - `updatedAt`: Timestamp

### `faqs` Collection
- **Purpose**: Stores frequently asked questions and their answers for the public FAQ section.
- **Example Fields**:
  - `question`: String
  - `answer`: String
  - `category`: String (e.g., 'General', 'Technical', 'Billing')
  - `order`: Number (for display order)
  - `createdAt`: Timestamp
  - `updatedAt`: Timestamp

### `resources` Collection
- **Purpose**: Stores information about various resources (articles, documentation links, etc.).
- **Example Fields**:
  - `title`: String
  - `description`: String
  - `url`: String (link to external resource)
  - `type`: String (e.g., 'article', 'video', 'documentation')
  - `tags`: Array of strings
  - `createdAt`: Timestamp
  - `updatedAt`: Timestamp

### `certificates` Collection
- **Purpose**: Stores information about training certificates, potentially linked to users.
- **Example Fields**:
  - `certificateId`: Unique ID
  - `userId`: Reference to the `users` collection
  - `courseName`: String
  - `issueDate`: Timestamp
  - `expiryDate`: Timestamp
  - `status`: String (e.g., 'issued', 'pending', 'expired')

## 3. Firestore Indexes

Firestore requires indexes for many common query types, especially those involving `where` clauses, `orderBy`, or `limit` on multiple fields. Composite indexes are crucial for queries that combine multiple conditions.

**Note**: The specific indexes required will depend on the queries performed by the application. Firestore will suggest missing indexes in the console.

### Example Indexes:

#### Single Field Indexes (Automatic)
- Most single field queries are handled automatically.

#### Composite Indexes
```
// Example: Query for FAQs by category, ordered by order field
{
  "collectionGroup": "faqs",
  "queries": [
    {
      "fields": [
        { "fieldPath": "category", "order": "ASCENDING" },
        { "fieldPath": "order", "order": "ASCENDING" }
      ]
    }
  ]
}

// Example: Query for user certificates by userId, ordered by issueDate
{
  "collectionGroup": "certificates",
  "queries": [
    {
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "issueDate", "order": "DESCENDING" }
      ]
    }
  ]
}
```
*Actual indexes should be defined in `firestore.indexes.json`.*

## 4. Security Rules Configuration

Firestore Security Rules protect your data from unauthorized access. They are defined in `firestore.rules`.

**Principle**: Deny by default, allow by exception. Ensure rules are atomic and cover all read/write operations.

### Example Security Rules:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Allow read/write for authenticated users on their own user document
    match /users/{userId} {
      allow read, update, delete: if request.auth.uid == userId;
      allow create: if request.auth.uid != null; // Only authenticated users can create their own profile
    }

    // Allow public read for FAQs, but only authenticated writes (e.g., for admins)
    match /faqs/{faqId} {
      allow read: if true;
      allow create, update, delete: if request.auth.token.admin == true; // Example admin role
    }

    // Allow public read for Resources
    match /resources/{resourceId} {
      allow read: if true;
      allow create, update, delete: if request.auth.token.admin == true;
    }

    // Certificates can only be read by the owner or admins. Created by admins.
    match /certificates/{certificateId} {
      allow read: if request.auth.uid == resource.data.userId || request.auth.token.admin == true;
      allow create, update, delete: if request.auth.token.admin == true;
    }
  }
}
```
*Actual rules should be defined in `firestore.rules` and thoroughly tested.*

## 5. CRUD Operation Examples (JavaScript/TypeScript using Firebase SDK)

This section will demonstrate typical Create, Read, Update, and Delete operations for the defined collections using the Firebase JavaScript SDK.

### Initializing Firebase
```typescript
// src/lib/firebase.ts (or similar)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase configuration
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### `faqs` Collection Examples

#### Create an FAQ
```typescript
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Assuming firebase.ts exports db

interface FAQ {
  question: string;
  answer: string;
  category: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const createFAQ = async (faqData: Omit<FAQ, 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'faqs'), {
      ...faqData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};
```

#### Read FAQs
```typescript
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const getFAQs = async (category?: string) => {
  try {
    let q = collection(db, 'faqs');
    if (category) {
      q = query(q, where('category', '==', category));
    }
    q = query(q, orderBy('order', 'asc')); // Assuming 'order' field for sorting

    const querySnapshot = await getDocs(q);
    const faqs: FAQ[] = [];
    querySnapshot.forEach((doc) => {
      faqs.push({ id: doc.id, ...doc.data() } as FAQ);
    });
    return faqs;
  } catch (e) {
    console.error('Error getting documents: ', e);
    throw e;
  }
};
```

#### Update an FAQ
```typescript
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const updateFAQ = async (id: string, updates: Partial<Omit<FAQ, 'createdAt'>>) => {
  try {
    const faqRef = doc(db, 'faqs', id);
    await updateDoc(faqRef, {
      ...updates,
      updatedAt: new Date(),
    });
    console.log('Document successfully updated!');
  } catch (e) {
    console.error('Error updating document: ', e);
    throw e;
  }
};
```

#### Delete an FAQ
```typescript
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const deleteFAQ = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'faqs', id));
    console.log('Document successfully deleted!');
  } catch (e) {
    console.error('Error deleting document: ', e);
    throw e;
  }
};
```

## 6. Quick Start Checklist

1.  **Set up Firebase Project**: Create a new project in the Firebase Console.
2.  **Enable Firestore**: Navigate to the Firestore Database section and create a new database.
3.  **Install Firebase SDK**: `npm install firebase` in your project.
4.  **Initialize Firebase**: Configure your `firebaseConfig` and initialize the app (as shown in section 5).
5.  **Deploy Security Rules**: Copy the rules from `firestore.rules` (or this document) to the Firebase Console, or deploy via Firebase CLI: `firebase deploy --only firestore:rules`.
6.  **Deploy Indexes**: Copy the index definitions from `firestore.indexes.json` (or this document) to the Firebase Console, or deploy via Firebase CLI: `firebase deploy --only firestore:indexes`.
7.  **Implement Services**: Use the provided CRUD examples to build out your application's data services (e.g., `faqService.ts`, `resourceService.ts`).
8.  **Test Thoroughly**: Verify all operations against your Firestore instance and ensure security rules are enforced correctly.