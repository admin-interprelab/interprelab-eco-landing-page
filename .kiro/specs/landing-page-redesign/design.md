# Design Document: Landing Page Redesign

## Overview

This design document outlines the comprehensive redesign of the InterpreLab landing page to create a cohesive, visually stunning experience that matches the aesthetic quality of "The Interpreter Dilemma" page. The redesign focuses on:

1. **Visual Consistency**: Applying the sophisticated styling from the Dilemma page across all landing page components
2. **Navigation Enhancement**: Fixing broken links and integrating The Interpreter Dilemma as a Resources subpage
3. **Hero Section Redesign**: Creating an impactful first impression with modern design patterns
4. **Content Optimization**: Implementing collapsible FAQ and reordering sections for better user flow
5. **Certificate Styling**: Designing a professional certificate with "Coming Soon" overlay
6. **Functional CTAs**: Ensuring all call-to-action buttons work correctly
7. **Backend Integration**: Providing clear documentation for Firestore setup

## Architecture

### Component Hierarchy

```
Index (Landing Page)
├── Navigation (Updated with Dilemma link)
├── Hero (Redesigned)
├── StoryDrivenVideoHero (Pain Points)
├── ProductShowcase
├── CertificatesPremium (Redesigned with overlay)
├── Testimonials
├── FAQSection (Collapsible)
└── Footer
```

### Routing Structure

```
/                    → Index (Landing Page)
/interprestudy       → InterpreStudy Page
/resources           → Resources Page (featuring Dilemma)
/dilemma             → The Interpreter Dilemma
/waitlist            → Waitlist Page
/signin              → Sign In Page
/contact             → Contact Page
```

### Navigation Menu Structure

```
Solutions (Dropdown)
├── InterpreBot
├── InterpreCoach
├── InterpreStudy (Fixed link)
├── InterpreTrack
└── InterpreHub

Resources (Dropdown)
├── Resource Articles
├── Documentation
└── The Interpreter Dilemma (New)

About
Contact
```

## Components and Interfaces

### 1. Hero Component (Redesigned)

**Location**: `src/components/landing/Hero.tsx`

**Design Specifications**:

```typescript
interface HeroProps {
  // No props needed - self-contained
}

interface HeroState {
  isVisible: boolean;
  animationComplete: boolean;
}
```

**Visual Design**:
- **Background**: Dark gradient with subtle animated orbs (similar to Dilemma page)
- **Typography**:
  - Main headline: `font-serif text-5xl md:text-7xl lg:text-8xl`
  - Subheadline: `text-xl md:text-2xl text-muted-foreground`
- **Color Scheme**: Nobel gold accents (`#C5A059`) on dark background
- **Glass Effects**: Frosted glass cards with `backdrop-blur-md`
- **Animations**: Staggered fade-in with `animate-fade-in` delays

**Layout Structure**:
```
┌─────────────────────────────────────┐
│   [Badge: AI-Powered Platform]      │
│                                      │
│   Master Medical Interpretation     │
│   [Large Serif Headline]             │
│                                      │
│   Subtitle with value proposition    │
│                                      │
│   [Start Free Trial] [Sign In]      │
│                                      │
│   Stats: 50+ Countries | 10k+ Users │
│   Trust Badges: HIPAA | SOC 2       │
└─────────────────────────────────────┘
```

**CTA Buttons**:
- Primary: "Start Free Trial" → `/waitlist` (gradient background, glow effect)
- Secondary: "Sign In" → `/signin` (glass effect, border)

### 2. FAQ Section (Collapsible)

**Location**: `src/components/sections/FAQ/FAQSection.tsx`

**Design Specifications**:

```typescript
interface FAQSectionProps {
  initialDisplayCount?: number; // Default: 6
}

interface FAQSectionState {
  isExpanded: boolean;
  displayedFAQs: FAQItem[];
  searchQuery: string;
  activeCategory: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
```

**Behavior**:
1. Initially display 5-6 FAQs (most frequently asked)
2. "See More" button expands to show all FAQs
3. "Show Less" button collapses back to initial state
4. Smooth height transition animation
5. Maintain search and filter functionality

**Visual Design**:
- Glass card container with border
- Nobel gold accent on hover
- Smooth accordion transitions
- "See More" button with arrow icon and subtle animation

### 3. Certificate Component (Redesigned)

**Location**: `src/components/landing/CertificatesPremium.tsx`

**Design Specifications**:

```typescript
interface CertificateCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  comingSoon?: boolean;
}
```

**Certificate Visual Design**:
- **Border**: Ornate border with corner decorations
- **Seal**: Official-looking seal/badge graphic
- **Typography**: Formal serif fonts for certificate text
- **Background**: Subtle parchment texture or gradient
- **Layout**: Centered text with hierarchical spacing

**Coming Soon Overlay**:
```css
.coming-soon-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.coming-soon-text {
  font-size: 2rem;
  font-weight: bold;
  color: #C5A059;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  animation: pulse 2s ease-in-out infinite;
}
```

### 4. Navigation Component (Updated)

**Location**: `src/components/Navigation.tsx`

**Updates Required**:

```typescript
const navItems = [
  {
    label: 'Solutions',
    submenu: [
      { label: 'InterpreBot', href: '/interprebot' },
      { label: 'InterpreCoach', href: '/interprecoach' },
      { label: 'InterpreStudy', href: '/interprestudy' }, // Fixed
      { label: 'InterpreTrack', href: '/interpretrack' },
      { label: 'InterpreHub', href: '/interpre-hub' },
    ]
  },
  {
    label: 'Resources',
    submenu: [
      { label: 'Articles', href: '/resources' },
      { label: 'Documentation', href: '/resources#docs' },
      { label: 'The Interpreter Dilemma', href: '/dilemma' }, // New
    ]
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
```

### 5. Resources Page (Enhanced)

**Location**: `src/pages/Resources.tsx`

**Design Specifications**:

```typescript
interface ResourceItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  href: string;
  featured?: boolean;
  category: 'article' | 'report' | 'documentation';
}
```

**Dilemma Feature Card**:
- Large featured card at top of resources
- Thumbnail preview of Dilemma page
- Nobel gold border and accent
- "Special Report" badge
- Prominent CTA button

## Data Models

### FAQ Data Structure

```typescript
interface FAQData {
  faqs: FAQItem[];
  categories: FAQCategory[];
  initialDisplayCount: number;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'products' | 'pricing' | 'technical' | 'privacy' | 'support';
  priority: number; // For determining initial display
  helpful: number; // Tracking user feedback
  notHelpful: number;
}

interface FAQCategory {
  value: string;
  label: string;
  icon?: string;
}
```

### Certificate Data Structure

```typescript
interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  comingSoon: boolean;
  enrollmentUrl?: string;
  imageUrl?: string;
}

interface PremiumMembership {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: 'month' | 'year';
  features: string[];
  trialDays?: number;
  signupUrl: string;
}
```

### Resource Data Structure

```typescript
interface Resource {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'article' | 'report' | 'documentation' | 'guide';
  featured: boolean;
  thumbnail: string;
  href: string;
  publishedDate: Date;
  author?: string;
  tags: string[];
}
```

### Firestore Collections

```typescript
// Collection: faqs
interface FAQDocument {
  id: string;
  question: string;
  answer: string;
  category: string;
  priority: number;
  helpfulCount: number;
  notHelpfulCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Collection: resources
interface ResourceDocument {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  featured: boolean;
  thumbnailUrl: string;
  href: string;
  publishedDate: Timestamp;
  author: string;
  tags: string[];
  viewCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Collection: certificates
interface CertificateDocument {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  comingSoon: boolean;
  enrollmentUrl: string;
  imageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Styling Guidelines

### Color Palette (From Dilemma Page)

```css
/* Primary Colors */
--nobel-gold: #C5A059;
--nobel-dark: #1a1a1a;
--nobel-cream: #F9F8F4;

/* Background */
--background: hsl(0 0% 10%);
--foreground: hsl(48 15% 97%);

/* Accents */
--primary: hsl(39 48% 56%); /* Nobel Gold */
--muted-foreground: hsl(210 20% 65%);
```

### Typography System

```css
/* Headings */
.heading-xl {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.heading-lg {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  line-height: 1.2;
}

.heading-md {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.3;
}

/* Body Text */
.body-lg {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  line-height: 1.7;
  color: hsl(var(--muted-foreground));
}

.body-md {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}
```

### Glass Morphism Effects

```css
.glass {
  background: hsl(240 10% 6% / 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid hsl(210 30% 98% / 0.1);
}

.glass-card {
  @apply glass rounded-xl p-8;
  box-shadow: 0 8px 32px hsl(240 10% 3.9% / 0.6);
}

.glass-hover {
  @apply glass transition-all duration-300;
}

.glass-hover:hover {
  background: hsl(240 10% 8% / 0.9);
  border-color: hsl(39 48% 56% / 0.3);
  transform: translateY(-2px);
}
```

### Animation Classes

```css
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
```

## Error Handling

### Navigation Errors

```typescript
// Handle missing routes
const handleNavigationError = (path: string) => {
  console.error(`Navigation failed: ${path}`);
  toast.error('Page not found. Redirecting to home...');
  navigate('/');
};

// Validate route before navigation
const safeNavigate = (path: string) => {
  const validRoutes = [
    '/', '/interprestudy', '/dilemma', '/resources',
    '/waitlist', '/signin', '/contact'
  ];

  if (validRoutes.includes(path)) {
    navigate(path);
  } else {
    handleNavigationError(path);
  }
};
```

### Component Error Boundaries

```typescript
class LandingPageErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Landing page error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Firestore Error Handling

```typescript
const fetchFAQs = async (): Promise<FAQItem[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'faqs'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FAQItem));
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    toast.error('Failed to load FAQs. Using cached data.');
    return getCachedFAQs(); // Fallback to local data
  }
};
```

## Testing Strategy

### Unit Testing

**Framework**: Vitest + React Testing Library

**Test Coverage**:

1. **Hero Component Tests**:
   - Renders all elements correctly
   - CTA buttons navigate to correct routes
   - Animations trigger on mount
   - Responsive layout adjusts properly

2. **FAQ Component Tests**:
   - Displays initial 6 FAQs
   - "See More" expands to show all FAQs
   - "Show Less" collapses back
   - Search filters FAQs correctly
   - Category tabs filter correctly

3. **Navigation Component Tests**:
   - All menu items render
   - Dropdowns open/close correctly
   - Dilemma link appears in Resources
   - Mobile menu functions properly

4. **Certificate Component Tests**:
   - Certificate renders with correct styling
   - Coming Soon overlay displays
   - Hover effects work
   - CTA buttons are disabled when coming soon

### Property-Based Testing

**Framework**: fast-check (JavaScript property-based testing library)

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Navigation Link Consistency

*For any* InterpreStudy link on the landing page, clicking it should navigate to the /interprestudy route.

**Validates: Requirements 1.1, 1.4**

### Property 2: Page Rendering Without Errors

*For any* valid route in the application, accessing it should render the corresponding page without throwing JavaScript errors.

**Validates: Requirements 1.3**

### Property 3: Glass Effect Consistency

*For any* component using glass effects on the landing page, the applied CSS classes should match those used on the Dilemma page (backdrop-blur, opacity, border).

**Validates: Requirements 3.1**

### Property 4: Typography Consistency

*For any* text element on the landing page, the font-family and font-size should match the corresponding element type on the Dilemma page.

**Validates: Requirements 3.2**

### Property 5: Color Scheme Consistency

*For any* element using accent colors on the landing page, the color values should match the nobel-gold (#C5A059) and muted-foreground patterns from the Dilemma page.

**Validates: Requirements 3.3**

### Property 6: Layout Consistency

*For any* container element on the landing page, the max-width and padding values should match the patterns used on the Dilemma page.

**Validates: Requirements 3.4**

### Property 7: Animation Consistency

*For any* animated element on the landing page, the animation timing and effects should be similar to those on the Dilemma page (fade-in, stagger delays).

**Validates: Requirements 3.5**

### Property 8: FAQ Expansion Behavior

*For any* FAQ dataset with more than 6 items, clicking "See More" should reveal all hidden FAQs, and clicking "Show Less" should return to showing only the initial 6.

**Validates: Requirements 5.2, 5.3, 5.4**

### Property 9: CTA Button Functionality

*For any* CTA button on the landing page, clicking it should either navigate to a valid route or execute a defined action without errors.

**Validates: Requirements 7.1**

### Property 10: Product CTA Navigation

*For any* product-specific CTA button, clicking it should navigate to the corresponding product page route.

**Validates: Requirements 7.6**

### Property 11: Learn More Button Behavior

*For any* "Learn More" button, clicking it should either scroll to a valid section ID or navigate to a valid route.

**Validates: Requirements 7.4**

## Backend Integration Guide

### Firestore Setup

#### Collection Structures

**1. FAQs Collection** (`faqs`)

```typescript
// Document structure
{
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

**2. Resources Collection** (`resources`)

```typescript
// Document structure
{
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

**3. Certificates Collection** (`certificates`)

```typescript
// Document structure
{
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

#### Fastest Setup Approach

**Step 1: Initialize Firestore** (if not already done)

```typescript
// src/services/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your config from Firebase Console
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

**Step 2: Create Service Files**

```typescript
// src/services/faqService.ts
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase/config';

export const getFAQs = async (limitCount?: number) => {
  const faqsRef = collection(db, 'faqs');
  const q = limitCount
    ? query(faqsRef, orderBy('priority', 'desc'), limit(limitCount))
    : query(faqsRef, orderBy('priority', 'desc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getFAQsByCategory = async (category: string) => {
  const faqsRef = collection(db, 'faqs');
  const q = query(
    faqsRef,
    where('category', '==', category),
    orderBy('priority', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
```

**Step 3: Seed Initial Data**

```typescript
// scripts/seedFirestore.ts
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../src/services/firebase/config';

const seedFAQs = async () => {
  const faqs = [
    {
      question: 'What is InterpreLab?',
      answer: 'InterpreLab is an AI-powered ecosystem...',
      category: 'general',
      priority: 100,
      helpfulCount: 0,
      notHelpfulCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    },
    // Add more FAQs...
  ];

  for (const faq of faqs) {
    await addDoc(collection(db, 'faqs'), faq);
  }

  console.log('FAQs seeded successfully');
};

seedFAQs();
```

**Step 4: Security Rules**

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // FAQs - Public read, admin write
    match /faqs/{faqId} {
      allow read: if true;
      allow write: if request.auth != null &&
                     request.auth.token.admin == true;
    }

    // Resources - Public read, admin write
    match /resources/{resourceId} {
      allow read: if true;
      allow write: if request.auth != null &&
                     request.auth.token.admin == true;

      // Increment view count
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
                      .hasOnly(['viewCount']);
    }

    // Certificates - Public read, admin write
    match /certificates/{certId} {
      allow read: if true;
      allow write: if request.auth != null &&
                     request.auth.token.admin == true;
    }
  }
}
```

#### CRUD Operations Examples

**Create**:
```typescript
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const createFAQ = async (faqData: Omit<FAQDocument, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(collection(db, 'faqs'), {
    ...faqData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};
```

**Read**:
```typescript
import { doc, getDoc } from 'firebase/firestore';

const getFAQById = async (id: string) => {
  const docRef = doc(db, 'faqs', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};
```

**Update**:
```typescript
import { doc, updateDoc, Timestamp } from 'firebase/firestore';

const updateFAQ = async (id: string, updates: Partial<FAQDocument>) => {
  const docRef = doc(db, 'faqs', id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};
```

**Delete**:
```typescript
import { doc, deleteDoc } from 'firebase/firestore';

const deleteFAQ = async (id: string) => {
  const docRef = doc(db, 'faqs', id);
  await deleteDoc(docRef);
};
```

#### Quick Start Checklist

1. ✅ Enable Firestore in Firebase Console
2. ✅ Copy firebaseConfig to `src/services/firebase/config.ts`
3. ✅ Create collections: `faqs`, `resources`, `certificates`
4. ✅ Add indexes via Firebase Console (Firestore → Indexes)
5. ✅ Deploy security rules: `firebase deploy --only firestore:rules`
6. ✅ Run seed script to populate initial data
7. ✅ Test CRUD operations in development

## Performance Considerations

### Image Optimization

- Use WebP format for all images with JPEG fallback
- Implement lazy loading for below-the-fold images
- Use responsive images with `srcset` for different screen sizes
- Compress images to < 200KB for thumbnails, < 500KB for hero images

### Code Splitting

```typescript
// Lazy load heavy components
const Dilemma = lazy(() => import('./pages/Dilemma'));
const InterpreStudy = lazy(() => import('./pages/InterpreStudy'));

// Wrap in Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/dilemma" element={<Dilemma />} />
    <Route path="/interprestudy" element={<InterpreStudy />} />
  </Routes>
</Suspense>
```

### Caching Strategy

```typescript
// Cache FAQ data for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
let faqCache: { data: FAQItem[], timestamp: number } | null = null;

export const getCachedFAQs = async () => {
  const now = Date.now();

  if (faqCache && (now - faqCache.timestamp) < CACHE_DURATION) {
    return faqCache.data;
  }

  const data = await getFAQs();
  faqCache = { data, timestamp: now };
  return data;
};
```

## Accessibility

### ARIA Labels

```typescript
// Navigation
<nav aria-label="Main navigation">
  <button aria-expanded={isOpen} aria-controls="mobile-menu">
    Menu
  </button>
</nav>

// FAQ Accordion
<button
  aria-expanded={isExpanded}
  aria-controls={`faq-answer-${id}`}
>
  {question}
</button>

// CTA Buttons
<button aria-label="Start free trial - Navigate to waitlist">
  Start Free Trial
</button>
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Implement focus visible styles
- Maintain logical tab order
- Support Escape key to close modals/dropdowns

### Screen Reader Support

- Use semantic HTML elements
- Provide alt text for all images
- Use proper heading hierarchy (h1 → h2 → h3)
- Announce dynamic content changes with aria-live regions

## Security Considerations

### Input Validation

```typescript
// Sanitize user input for search
const sanitizeSearchQuery = (query: string): string => {
  return query
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 100); // Limit length
};
```

### XSS Prevention

- Use React's built-in XSS protection (JSX escaping)
- Sanitize any HTML content from Firestore before rendering
- Use `dangerouslySetInnerHTML` only when absolutely necessary with sanitized content

### HTTPS Enforcement

- Ensure all API calls use HTTPS
- Set secure cookies for authentication
- Implement Content Security Policy headers

## Deployment

### Build Optimization

```bash
# Production build with optimizations
npm run build

# Analyze bundle size
npm run build -- --analyze

# Preview production build locally
npm run preview
```

### Environment Variables

```env
# .env.production
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Monitoring

- Set up Firebase Analytics for user behavior tracking
- Implement error tracking with Sentry or similar
- Monitor Core Web Vitals (LCP, FID, CLS)
- Track conversion rates for CTAs

## Maintenance

### Content Updates

- FAQ content should be manageable via Firestore Console
- Resources can be added/updated without code changes
- Certificate information can be toggled between "Coming Soon" and "Available"

### Version Control

- Use semantic versioning for releases
- Tag releases in Git
- Maintain CHANGELOG.md for user-facing changes

### Documentation

- Keep component documentation up to date
- Document any custom hooks or utilities
- Maintain API documentation for Firestore services
