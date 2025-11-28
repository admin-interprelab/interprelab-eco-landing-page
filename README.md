# InterpreLab Project

Welcome to the InterpreLab project! This document provides a comprehensive guide to understanding, setting up, and contributing to the project.

## 1. Core Identity & Mission

- **Project Name:** **InterpreLab**
- **Elevator Pitch:** InterpreLab is an ecosystem of AI-powered solutions for medical interpreters! We are focused on human skill optimization and bridging critical communication gaps in healthcare.
- **Founder Profile:** The founder is a seasoned expert in the medical interpreting field and an early adopter/developer of AI-driven, agentic technologies. The focus is on continuous innovation of backend AI services.

## 2. Products & Services

### InterpreBot 🤖 (AI Training & Assessment)
- **Function:** Provides realistic, interactive linguistic assessments to evaluate and hone interpreters' core skills with deep grammatical and contextual analysis.
- **Key Features:**
    - Deep analysis of linguistic accuracy, terminology, and grammatical correctness.
    - Generates a detailed performance dashboard pinpointing "areas of opportunity".
    - Acts as an AI Mentor to guide users through Customized Learning Paths.

### InterpreCoach 🎧 (Real-Time AI Assistance Browser Extension)
- **Function:** A multi-modal, real-time AI assistant that integrates discreetly into existing interpreter platforms via a browser extension.
- **Key Features:**
    - **Advanced Terminology Management:** Provides real-time translations with additional context, relevant images, and medication details (generic name, brand name, aliases).
    - **Acoustic & Voice Training:** Utilizes backend speech regulator agents to analyze and assist with voice softness, deepness, pitch, and speed.
    - **Key Insights & Summarization:** Actively listens and summarizes critical points of the conversation.
    - **Predictive Assistance:** Infers conversational context to proactively prepare relevant vocabulary.

### Certification-Ready Training Courses 🎓
- **Offering:** 40 to 60-hour Healthcare Medical Interpreter Training Courses.
- **Accreditation:** Approved by **NBCMI** and **CCHI** as prerequisite courses.

### Interpreter Community & Resources (InterpreLinks) 🤝
- **Function:** A dedicated social web application and professional network for interpreters.
- **Features:** Community forums, job boards, and a curated library of resources.

## 3. Technical & Architectural Directives

### Frontend Code Generation
- **Tech Stack:** **React** with **Next.js** (App Router). Code must be in **TypeScript**.
- **Styling:** **Tailwind CSS** exclusively.
- **Architecture:** Modular, component-based, and reusable.
- **Accessibility:** Must adhere to **WCAG 2.1 AA** standards.

### Backend & Google Cloud Integration
- **Philosophy:** **Serverless-first architecture.**
- **Core Services:**
    - **Authentication:** **Firebase Authentication**.
    - **Database:** **Cloud Firestore** (NoSQL best practices).
    - **Backend Logic:** **Cloud Functions (2nd Gen)**.
    - **AI/ML APIs:** **Speech-to-Text API** and **Natural Language API**.
    - **File Storage:** **Google Cloud Storage**.
- **Security:** Use **Secret Manager** for secrets.

### Getting Started & Connecting to the Backend

Follow these steps to set up your local development environment and connect it to a live Firebase backend.

#### Step 1: Clone the Repository
```bash
git clone https://github.com/your-repo/interprelab.git
cd interprelab
```

#### Step 2: Install Project Dependencies
```bash
npm install
```

#### Step 3: Create and Configure a Firebase Project

1.  **Create the Project:**
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Click **"Add project"**, give it a name (e.g., "InterpreLab-dev"), and follow the setup steps.

2.  **Register a Web App:**
    - In your project's dashboard, click the **Web icon (`</>`)**.
    - Give the app a nickname (e.g., "InterpreLab Web") and click **"Register app"**.

3.  **Copy Firebase Config:**
    - After registering, Firebase will show you a `firebaseConfig` object. **Copy this entire object.**

4.  **Add Config to Your Local Project:**
    - Open the `src/firebase.ts` file in your editor.
    - You will see a `firebaseConfig` object with placeholder values. **Replace these placeholders with the object you copied** from your Firebase project.

    ```typescript
    // src/firebase.ts
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    // PASTE YOUR FIREBASE CONFIGURATION OBJECT HERE
    const firebaseConfig = {
      apiKey: "AIza...",
      authDomain: "your-project-id.firebaseapp.com",
      // ... and so on
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

#### Step 4: Set Up Firestore Database
1.  In the Firebase Console, go to the **Build > Firestore Database** section.
2.  Click **"Create database"**.
3.  Select **"Start in test mode"**. This is crucial for initial development to allow read/write access.
    *(Note: You must add security rules before going to production.)*
4.  Choose a location for your database and click **"Enable"**.

#### Step 5: Run the Development Server
Now that your project is connected to Firebase, you can start the local server.
```bash
npm run dev
```
Your application will open on `http://localhost:5173`, and it is now connected to your personal Firebase backend.

### Deployment & DevOps (CI/CD)
- **Hosting:** **Firebase Hosting** for the frontend.
- **CI/CD:** Use **Google Cloud Build** and a `cloudbuild.yaml` file for automation.

## 4. Content & SEO Directives
- **Target Persona:** The Aspiring/Certified Medical Interpreter.
- **Primary Keywords:** "medical interpreter training", "AI for interpreters", "NBCMI prerequisite course", "CCHI approved training", "interpreter skills assessment".
