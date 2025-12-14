interface LargestContentfulPaintEntry extends PerformanceEntry {
  renderTime: number;
  loadTime: number;
  element: Element;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceEventTiming extends PerformanceEntry {
    processingStart: number;
}


/**
 * Performance monitoring utilities for tracking Core Web Vitals
 */

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}
/**
 * Report Web Vitals to console (can be extended to send to analytics)
 */
export const reportWebVitals = (onPerfEntry?: (metric: PerformanceMetrics) => void) => {
  if (onPerfEntry && typeof window !== 'undefined') {
    // Use web-vitals library if available, otherwise use Performance API
    if ('PerformanceObserver' in window) {
      // Observe FCP
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              onPerfEntry({ fcp: entry.startTime });
              fcpObserver.disconnect();
            }
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP observation failed:', e);
      }

      // Observe LCP
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as LargestContentfulPaintEntry;
          onPerfEntry({ lcp: lastEntry.renderTime || lastEntry.loadTime });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observation failed:', e);
      }

      // Observe FID
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            onPerfEntry({ fid: (entry as PerformanceEventTiming).processingStart - entry.startTime });
            fidObserver.disconnect();
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observation failed:', e);
      }

      // Observe CLS
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as LayoutShift).hadRecentInput) {
              clsValue += (entry as LayoutShift).value;
              onPerfEntry({ cls: clsValue });
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observation failed:', e);
      }
    }

    // Get TTFB from Navigation Timing
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navEntry) {
        onPerfEntry({ ttfb: navEntry.responseStart - navEntry.requestStart });
      }
    }
  }
};
export const logPerformanceMetrics = () => {
  if (process.env.NODE_ENV === 'development') {
    reportWebVitals((metrics) => {
      console.log('📊 Performance Metrics:', metrics);
    });
  }
};

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fonts = [
    '/fonts/inter-var.woff2',
    '/fonts/playfair-display.woff2',
  ];

  fonts.forEach((font) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = font;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with Intersection Observer
 */
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
};
