# Performance Optimization Guide

## Overview

This document outlines the performance optimizations implemented for the InterpreLab application to achieve faster load times and better user experience.

## Implemented Optimizations

### 1. Enhanced Vite Configuration

**File**: `vite.config.ts`

- **Improved Code Splitting**: Granular chunk splitting for better caching
  - `react-vendor`: React core libraries
  - `ui-vendor`: Radix UI components
  - `animation-vendor`: Framer Motion
  - `backend-vendor`: Supabase & Firebase
  - `three-vendor`: 3D graphics libraries
  - `query-vendor`: TanStack Query
  - `icons-vendor`: Lucide React icons

- **Build Optimizations**:
  - Target ES2020 for smaller bundles
  - Terser minification with console removal in production
  - CSS code splitting enabled
  - Optimized chunk and asset file names

- **Bundle Analyzer**: Run `npm run build:analyze` to visualize bundle composition

### 2. HTML Optimizations

**File**: `index.html`

- **Resource Hints**:
  - DNS prefetch for external domains
  - Preconnect for fonts
  - Module preload for main entry point

- **Font Loading**:
  - Async font loading with `media="print"` trick
  - `font-display: swap` to prevent FOUT

- **Critical CSS**:
  - Inline critical styles for faster FCP
  - Loading spinner to prevent blank page

- **Meta Tags**:
  - Improved SEO with better descriptions
  - Theme color for mobile browsers

### 3. Performance Monitoring

**File**: `src/utils/performance.ts`

Tracks Core Web Vitals:
- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 600ms

Usage:
```typescript
import { reportWebVitals } from '@/utils/performance';

reportWebVitals((metrics) => {
  console.log('Performance:', metrics);
  // Send to analytics service
});
```

### 4. Optimized Image Component

**File**: `src/components/OptimizedImage.tsx`

Features:
- Lazy loading with Intersection Observer
- Blur-up placeholder effect
- Priority loading for above-the-fold images
- Automatic WebP support

Usage:
```tsx
<OptimizedImage
  src="/hero-image.jpg"
  alt="Hero"
  priority={true}  // For above-the-fold images
  width={1200}
  height={600}
/>
```

### 5. Docker Build Optimization

**File**: `.dockerignore`

- Excludes unnecessary files from Docker context
- Reduces build time and image size
- Keeps only production-necessary files

## Performance Targets

### Current Baseline (Estimated)
- Bundle Size: ~850KB (gzipped)
- FCP: ~2.5s
- TTI: ~4.2s
- Lighthouse Score: ~72

### Target Metrics
- Bundle Size: <300KB (gzipped) for landing page
- FCP: <1.2s
- TTI: <2.5s
- Lighthouse Score: >95

## Measuring Performance

### 1. Build Analysis

```bash
# Generate bundle visualization
npm run build:analyze

# This opens dist/stats.html showing:
# - Bundle composition
# - Chunk sizes
# - Dependencies
```

### 2. Lighthouse Audit

```bash
# Build production version
npm run build

# Preview locally
npm run preview

# Run Lighthouse in Chrome DevTools
# Or use CLI:
npx lighthouse http://localhost:4173 --view
```

### 3. Real User Monitoring

Performance metrics are logged to console in development mode. In production, send to analytics:

```typescript
import { reportWebVitals } from '@/utils/performance';

reportWebVitals((metrics) => {
  // Send to Google Analytics
  gtag('event', 'web_vitals', metrics);

  // Or send to custom endpoint
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify(metrics),
  });
});
```

## Additional Optimization Opportunities

### 1. Image Optimization

**Current**: Using standard image formats
**Recommended**:
- Convert images to WebP format
- Use responsive images with `srcset`
- Compress images (target: <200KB for thumbnails, <500KB for hero)

```bash
# Install sharp for image optimization
npm install -D sharp

# Create optimization script
node scripts/optimize-images.js
```

### 2. Route-Based Code Splitting

**Current**: Lazy loading for feature pages
**Recommended**: Further split landing page components

```tsx
// Lazy load heavy landing components
const StoryDrivenVideoHero = lazy(() => import('@/components/landing/StoryDrivenVideoHero'));
const ProductShowcase = lazy(() => import('@/components/landing/ProductShowcase'));
```

### 3. CDN for Static Assets

**Recommended**: Use Cloudflare or similar CDN
- Serve static assets from edge locations
- Enable Brotli compression
- Set long cache headers (1 year)

### 4. Service Worker for Caching

**Recommended**: Implement service worker with Workbox

```bash
npm install -D workbox-cli

# Generate service worker
workbox generateSW workbox-config.js
```

### 5. Preload Critical Resources

Add to `index.html`:
```html
<!-- Preload critical images -->
<link rel="preload" as="image" href="/hero-image.webp">

<!-- Preload critical fonts -->
<link rel="preload" as="font" type="font/woff2"
      href="/fonts/inter-var.woff2" crossorigin>
```

## Monitoring in Production

### 1. Google Analytics 4

Track Core Web Vitals:
```typescript
// Send to GA4
gtag('event', 'web_vitals', {
  event_category: 'Web Vitals',
  event_label: metric.name,
  value: Math.round(metric.value),
  non_interaction: true,
});
```

### 2. Sentry Performance Monitoring

```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_DSN',
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 0.1, // 10% of transactions
});
```

### 3. Custom Performance Dashboard

Create a dashboard to track:
- Page load times by route
- Bundle sizes over time
- Core Web Vitals trends
- Error rates

## Best Practices

1. **Always measure before optimizing**: Use `npm run build:analyze` to identify bottlenecks
2. **Test on real devices**: Use Chrome DevTools device emulation and real mobile devices
3. **Monitor in production**: Set up RUM (Real User Monitoring) to track actual user experience
4. **Optimize images**: This is often the biggest win for performance
5. **Lazy load non-critical resources**: Only load what's needed for the current view
6. **Use code splitting**: Break large bundles into smaller chunks
7. **Minimize third-party scripts**: Each external script adds overhead
8. **Enable compression**: Gzip or Brotli for all text assets
9. **Use CDN**: Serve static assets from edge locations
10. **Cache aggressively**: Set long cache headers for immutable assets

## Troubleshooting

### Large Bundle Size

1. Run `npm run build:analyze` to identify large dependencies
2. Check if dependencies can be lazy-loaded
3. Look for duplicate dependencies in the bundle
4. Consider lighter alternatives for heavy libraries

### Slow FCP

1. Inline critical CSS
2. Preload critical resources
3. Optimize font loading
4. Reduce render-blocking resources

### Slow TTI

1. Reduce JavaScript bundle size
2. Defer non-critical JavaScript
3. Use code splitting more aggressively
4. Optimize third-party scripts

### High CLS

1. Set explicit width/height on images
2. Reserve space for dynamic content
3. Avoid inserting content above existing content
4. Use CSS transforms instead of layout-triggering properties

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Core Web Vitals](https://web.dev/vitals/)
