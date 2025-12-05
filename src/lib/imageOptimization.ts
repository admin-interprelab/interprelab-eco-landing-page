/**
 * Image optimization utilities for WebP support detection and responsive image generation
 */

// Cache for WebP support detection
let webpSupported: boolean | null = null;

/**
 * Detect WebP support in the browser
 */
export const checkWebPSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (webpSupported !== null) {
      resolve(webpSupported);
      return;
    }

    const webP = new Image();
    webP.onload = webP.onerror = () => {
      webpSupported = webP.height === 2;
      resolve(webpSupported);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Get WebP support synchronously (use after checkWebPSupport has been called)
 */
export const isWebPSupported = (): boolean => {
  return webpSupported === true;
};

/**
 * Generate optimized image URL with WebP fallback
 */
export const getOptimizedImageUrl = (
  src: string,
  width?: number,
  quality: number = 80
): string => {
  // If it's already a data URL or external URL, return as-is
  if (src.startsWith('data:') || src.startsWith('http')) {
    return src;
  }

  const lastDotIndex = src.lastIndexOf('.');
  const basePath = lastDotIndex > -1 ? src.substring(0, lastDotIndex) : src;
  const extension = lastDotIndex > -1 ? src.substring(lastDotIndex) : '';

  // Generate optimized filename
  let optimizedSrc = basePath;

  if (width) {
    optimizedSrc += `-${width}w`;
  }

  // Use WebP if supported, otherwise use original format
  if (isWebPSupported()) {
    optimizedSrc += '.webp';
  } else {
    optimizedSrc += extension;
  }

  return optimizedSrc;
};

/**
 * Generate responsive image srcSet
 */
export const generateSrcSet = (
  src: string,
  breakpoints: number[] = [320, 640, 768, 1024, 1280, 1536],
  format?: 'webp' | 'original'
): string => {
  const lastDotIndex = src.lastIndexOf('.');
  const basePath = lastDotIndex > -1 ? src.substring(0, lastDotIndex) : src;
  const extension = lastDotIndex > -1 ? src.substring(lastDotIndex) : '';

  return breakpoints
    .map(width => {
      const targetFormat = format === 'webp' ? '.webp' : extension;
      return `${basePath}-${width}w${targetFormat} ${width}w`;
    })
    .join(', ');
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string, priority: 'high' | 'low' = 'low'): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;

  if (priority === 'high') {
    link.setAttribute('fetchpriority', 'high');
  }

  document.head.appendChild(link);
};

/**
 * Preload multiple images for above-fold content
 */
export const preloadCriticalImages = (images: string[]): void => {
  images.forEach(src => preloadImage(src, 'high'));
};

/**
 * Generate blur placeholder data URL
 */
export const generateBlurPlaceholder = (
  width: number = 400,
  height: number = 300,
  color: string = '#f3f4f6'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Image loading performance observer
 */
export class ImagePerformanceObserver {
  private observer: PerformanceObserver | null = null;
  private callbacks: ((entry: PerformanceEntry) => void)[] = [];

  constructor() {
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource' && entry.name.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
            this.callbacks.forEach(callback => callback(entry));
          }
        });
      });

      this.observer.observe({ entryTypes: ['resource'] });
    }
  }

  onImageLoad(callback: (entry: PerformanceEntry) => void): void {
    this.callbacks.push(callback);
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.callbacks = [];
  }
}

/**
 * Initialize image optimization on app start
 */
export const initializeImageOptimization = async (): Promise<void> => {
  // Check WebP support
  await checkWebPSupport();

  // Preload critical images (can be configured based on route)
  const criticalImages = [
    '/images/hero-bg.jpg',
    '/images/logo.png'
  ];

  preloadCriticalImages(criticalImages);
};
